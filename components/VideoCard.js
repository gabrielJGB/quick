import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { formatDateString, formatDateToGMTMinus3, formatMillisecondsToTimeString } from '../utils/time'

const VideoCard = ({ video }) => {

    const { push } = useRouter()


    return (

        <TouchableNativeFeedback onPress={() => push({
            pathname: "/player",
            params: { url: video.source }
        })}>

            <View style={s.container}>

                <Image source={{ uri: video.thumbnail.src }} style={s.img} />

                <View>
                    <View style={s.info}>
                        <Text style={s.title}>{video.session_title}</Text>
                        <Text style={s.creator}>{formatDateString(video.created_at.split(" ")[0])}</Text>
                        <Text style={s.creator}>{formatMillisecondsToTimeString(video.duration)}</Text>
                        {/* <Text style={s.creator}>Autor: {clip.creator.username}</Text> */}
                    </View>
                </View>
            </View>
        </TouchableNativeFeedback>
    ) 
}

export default VideoCard

const s = StyleSheet.create({
    container: {
        backgroundColor: "#1c1c1c",
        flexDirection: "column",
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "#3c3c3c",

    },
    img: {
        height: 200,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,

        borderColor: "grey"
    },
    title: {
        color: "white",
        fontSize: 14,
        fontWeight: "500"
    },
    creator: {
        color: "grey",
        fontSize: 12,
    },
    info: {
        padding: 7,
        flexDirection: "column",
        gap: 0
    }

})