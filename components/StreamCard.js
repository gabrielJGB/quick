import { Dimensions, Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useStateContext } from '../context/StateProvider'
import { useRouter } from 'expo-router'
import { useSettings } from '../context/SettingsProvider'
import { fetchStreamerData } from '../utils/fetch'
import { TouchableRipple } from 'react-native-paper'


const StreamCard = ({ thumbnailUri, profileUri, username, sessionTitle, category, viewers, twoColumns, channelId, liveTime }) => {

    const { push } = useRouter()
    const { setSelectedStream, setSelectedProfile, setHeaderData } = useStateContext()
    const profileImgSize = twoColumns ? 30 : 40
    const thumbnailHeight = twoColumns ? 100 : 200
    const cardWidth = twoColumns ? ((Dimensions.get("window").width / 2) - 10) : (Dimensions.get("window").width - 20)
    const [loading, setLoading] = useState(true)
    const [proUri, setProfUri] = useState(profileUri)
    const { accentColor } = useSettings()
    const [pressIn, setPressIn] = useState(false)


    useEffect(() => {

        if (!profileUri)
            fetchStreamerData(username.replaceAll("_", "-"))
                .then(res => { setProfUri(res.profilepic) })
                .catch(error => { setProfUri(false) })
                .finally(() => setLoading(false))
        else
            setProfUri(profileUri)

        return () => setPressIn(false)
    }, [profileUri])

    return (

        <View style={[s.container, {
            width: cardWidth,
            transform: pressIn ? "scale(0.95)" : "none",

        }]}>

            <TouchableRipple

                onPressOut={() => setPressIn(false)}
                onPressIn={() => setPressIn(true)}

                onPress={() => {

                    setSelectedStream(username)
                    setHeaderData({
                        username,
                        profileUri: proUri,
                        sessionTitle,
                        category,
                        viewers,
                        channelId
                    })
                    push(`user/${username}?channelId=${channelId}`)
                }}
            >
                <View>
                    <Image source={{ uri: thumbnailUri }} style={[s.thumbnail, { height: thumbnailHeight }]} />
                </View>
            </TouchableRipple>

            <TouchableRipple
                onPressIn={() => setPressIn(true)}
                onPressOut={() => setPressIn(false)}
                onPress={() => {
                    setSelectedProfile(username)
                    push(`user/${username}?channelId=${channelId}`)
                }}
            >
                <View style={s.streamData}>
                    {
                        proUri ?
                            <Image source={{ uri: proUri }} style={[s.profileImg, { width: profileImgSize, height: profileImgSize }]} />
                            :
                            <View style={{ width: profileImgSize, height: profileImgSize }}></View>
                    }

                    <View style={s.textContainer}>
                        <Text style={s.username}>{username}</Text>
                        <Text numberOfLines={2} style={s.streamTitle}>{sessionTitle}</Text>
                        <Text numberOfLines={1} style={s.category}>{category}</Text>
                    </View>
                </View>

            </TouchableRipple>

            <View style={s.viewersContainer}>
                <Text style={s.viewers}> {viewers}</Text>
                <Text style={[s.dot, { backgroundColor: accentColor }]}>{"."}</Text>
            </View>

            <View style={s.timeContainer}>
                <Text style={s.time}> {liveTime}</Text>
            </View>

        </View>

    )
}

export default StreamCard

const s = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        borderRadius: 7,
        backgroundColor: "#1c1c1c",
        borderWidth: 1,
        borderColor: "#2c2c2c"
    },
    streamData: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        gap: 6,
        padding: 6
    },
    profileImg: {
        alignSelf: "flex-start",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10
    },
    thumbnail: {
        width: "100%",
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    textContainer: {
        flexDirection: "column",
        gap: 1,
        width: "78%"
    },
    username: {
        fontWeight: "500",
        color: "white",
        fontSize: 15,
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
    dot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        
    },
    viewers: {
        fontSize: 11,
        fontWeight: "500",
        color: "white"
    },
    viewersContainer: {
        position: "absolute",
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderWidth: 1,
        borderColor: "#3c3c3c",
        borderRadius: 5,
        paddingLeft: 1,
        paddingRight: 3,
        top: 5,
        right: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    timeContainer: {
        position: "absolute",
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderWidth: 1,
        borderColor: "#3c3c3c",
        borderRadius: 5,
        paddingLeft: 1,
        paddingRight: 3,
        top: 5,
        left: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    time: {
        color: "white",
        fontSize: 11,
        fontWeight: "500",
    }

})