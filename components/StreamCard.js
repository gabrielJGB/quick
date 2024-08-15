import { Dimensions, Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useStateContext } from '../context/StateProvider'
import { useRouter } from 'expo-router'
import { useSettings } from '../context/SettingsProvider'
import { fetchStreamerData } from '../utils/fetch'
import { TouchableRipple } from 'react-native-paper'


const StreamCard = ({ thumbnailUri, profileUri, username, sessionTitle, category, viewers, twoColumns, channelId }) => {

    const { push } = useRouter()
    const { setSelectedStream, setSelectedProfile, setHeaderData } = useStateContext()
    const profileImgSize = twoColumns ? 30 : 40
    const thumbnailHeight = twoColumns ? 100 : 200
    const cardWidth = twoColumns ? ((Dimensions.get("window").width / 2) - 10) : (Dimensions.get("window").width - 20)
    const [loading, setLoading] = useState(true)
    const [proUri, setProfUri] = useState(profileUri)
    const { accentColor } = useSettings()



    useEffect(() => {

        if (!profileUri)
            fetchStreamerData(username.replace("_", "-"))
                .then(res => { setProfUri(res.profilepic) })
                .catch(error => { setProfUri(false) })
                .finally(() => setLoading(false))
        else
            setProfUri(profileUri)

    }, [profileUri])

    return (
        <View style={[s.container, { width: cardWidth }]}>

            <TouchableRipple
                
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
                rippleColor={accentColor}
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
                        <Text numberOfLines={1} style={s.streamTitle}>{sessionTitle}</Text>
                        <Text numberOfLines={1} style={s.category}>{category}</Text>
                    </View>
                </View>

            </TouchableRipple>

            <View style={s.viewersContainer}>
                <Text style={s.viewers}> {viewers}</Text>
                <Text style={[s.dot, { backgroundColor: accentColor }]}>{"."}</Text>
            </View>

        </View>
    )
}

export default StreamCard

const s = StyleSheet.create({
    container: {

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
    viewersContainer: {
        position: "absolute",
        backgroundColor: "black",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
        paddingLeft: 1,
        paddingRight: 3,
        top: 5,
        right: 5,
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
        fontSize: 13,
        fontWeight: "500",
        color: "white"
    }

})