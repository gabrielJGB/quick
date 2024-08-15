import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { IconButton, Menu } from 'react-native-paper'
import { useSettings } from '../context/SettingsProvider'
import { useStateContext } from '../context/StateProvider'
import { fetchLivestream, fetchViewers } from '../utils/fetch'
import { formatFollowersCount, getM3U8Content, parseM3U8Content, transformURL } from '../utils/stream'
import { getTimeString } from '../utils/time'
import VideoPlayer from './VideoPlayer'


const Header = () => {

    const { push } = useRouter()
    const { accentColor,videoQuality,setVideoQuality } = useSettings()
    const { selectedStream, setSelectedProfile, setSelectedStream, headerData } = useStateContext()

    const [playbackUrl, setPlaybackUrl] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [visible, setVisible] = useState(false);
    const [selectedQuality, setSelectedQuality] = useState(2)
    const [qualityArray, setQualityArray] = useState(false)
    const [streamUrl, setStreamUrl] = useState(false)
    const [channelId, setChannelId] = useState(false)
    const [viewers, setViewers] = useState(false)
    const [time, setTime] = useState(false)
    const [createdAt, setCreatedAt] = useState(false)

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);


    const setupQuality = async (m3u8Url) => {

        const m3u8Content = await getM3U8Content(m3u8Url);
        if (!m3u8Content) return;

        const resolutions = parseM3U8Content(m3u8Content);
        setQualityArray(resolutions)

        const selectedRes = resolutions.find(item => item.resolution === videoQuality)
        setSelectedQuality(resolutions.indexOf(selectedRes))
        setStreamUrl(selectedRes && "url" in selectedRes && selectedRes.url || resolutions[0].url)

    }


    const _fetchViewers = () => {

        fetchViewers(channelId)
            .then(res => { setViewers(res.viewers) })
            .catch(e => setViewers(false))
    }

    useEffect(() => {

        setError(false)
        setLoading(true)
        fetchLivestream(selectedStream)
            .then(res => {
                setPlaybackUrl(res.data.playback_url)
                setCreatedAt(res.data.created_at)
                return res.data.id
            })
            .then(id => setChannelId(id))
            .catch(error => setError(error.message))
            .finally(() => setLoading(false))

    }, [selectedStream])


    useEffect(() => {

        let interval

        if (channelId) {
            _fetchViewers()
            interval = setInterval(() => {
                _fetchViewers()
            }, 1000 * 30);
        }

        return () => clearInterval(interval)

    }, [channelId])


    useEffect(() => {

        if (playbackUrl)
            setupQuality(playbackUrl)

    }, [playbackUrl])


    useEffect(() => {

        setTime(getTimeString(createdAt))

        let interval = setInterval(() => {
            setTime(getTimeString(createdAt))
        }, 1000 * 30);
        return () => clearInterval(interval)

    }, [createdAt])




    if (error)
        return <Text style={s.error}>Error: {error}</Text>

    return (


        <View style={s.container}>

            <View style={s.webviewContainer}>

                {
                    !loading && qualityArray ?
                        <View style={{ borderWidth: 0, flex: 1, width: "100%" }}>
                            <VideoPlayer streamUrl={streamUrl} />



                            <View style={s.viewersContainer}>

                                <Text style={s.viewers}> {viewers || headerData.viewers}</Text>
                                <Text style={[s.dot, { backgroundColor: accentColor }]}>{"."}</Text>
                            </View>


                        </View>
                        :
                        <ActivityIndicator size={22} color="white" />
                }

            </View>



            <View style={s.box}>
                <View style={s.streamInfo}>

                    <TouchableNativeFeedback
                        onPress={() => {
                            setSelectedProfile(headerData.username)
                            push(`user/${headerData.username}`)
                        }}>

                        {

                        }

                        <Image source={{ uri: transformURL(headerData.profileUri) || headerData.profileUri }} style={s.profilePicture} />
                    </TouchableNativeFeedback>


                    <View style={s.textContainer}>
                        <Text style={s.username}>{headerData.username}</Text>
                        <Text numberOfLines={4} style={s.streamTitle}>{headerData.sessionTitle}</Text>
                        <Text numberOfLines={1} style={s.category}>{headerData.category}</Text>
                    </View>



                </View>

                <View style={s.headerBottom}>
                    <Text style={s.time}>{time}</Text>
                    <Menu

                        visible={visible}
                        onDismiss={closeMenu}
                        anchorPosition='top'
                        anchor={<IconButton
                            style={{ borderRadius: 10, width: 25 }}
                            iconColor='white'
                            icon="dots-vertical"
                            size={25}
                            onPress={() => { openMenu() }}
                        />}>
                        <Menu.Item onPress={() => setSelectedStream(false)} title="Desconectar" dense />
                        {
                            qualityArray &&
                            qualityArray.map((item, i) => (
                                <Menu.Item
                                    key={i}
                                    onPress={() => {
                                        setVideoQuality(qualityArray[i].resolution)
                                        setStreamUrl(qualityArray[i].url)
                                        setSelectedQuality(i)
                                        closeMenu()
                                    }}
                                    title={item.resolution}
                                    leadingIcon={`checkbox${selectedQuality === i ? "-marked-circle" : "-blank-circle-outline"}`}
                                />
                            ))

                        }

                    </Menu>
                </View>


            </View>
        </View>



    )
}

export default Header

const s = StyleSheet.create({
    webviewContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        height: 200
    },
    box: {
        backgroundColor: "#1c1c1c",
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#2c2c2c"
    },
    container: {
        backgroundColor: "#1c1c1c",
        minHeight: 230
    },
    streamInfo: {
        width: "86%",

        alignItems: "center",
        flexDirection: "row",
        gap: 6,
        padding: 6


    },
    thumbnailUri: {
        width: '100%',
        height: 110,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    profilePicture: {
        alignSelf: "flex-start",
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10
    },
    username: {
        fontWeight: "500",
        color: "white",
        fontSize: 18,
    },
    category: {
        color: "grey",
        fontSize: 12,
    },

    streamTitle: {
        color: "white",
        fontSize: 9,
        fontWeight: "500",

    },
    textContainer: {
        flexDirection: "column",
        gap: 1,
        width: "90%",


    },
    viewersContainer: {
        position: "absolute",
        top: 2,
        right: 4,
        backgroundColor: "#000000e3",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 3,
        paddingLeft: 1,
        paddingRight: 3,
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 5,

    },
    viewers: {
        fontSize: 8,
        fontWeight: "500",
        color: "white"
    },
    error: {
        color: "white",
        textAlign: "center",
        marginVertical: 12
    },
    headerBottom: {
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    time: {
        color: "grey",
        fontSize: 11,
        fontWeight: "500",
        marginRight: 3,
        marginTop: 3,
    }
})