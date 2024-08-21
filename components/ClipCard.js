import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { formatDateToGMTMinus3 } from '../utils/time'

const ClipCard = ({ clip }) => {

    const { push } = useRouter()


    return (

        <TouchableNativeFeedback onPress={() => push({
            pathname: "/player",
            params: { url: clip.video_url,title:clip.title,isClip:true }
        })}>

            <View style={s.container}>

                <Image source={{ uri: clip.thumbnail_url }} style={s.img} />

                <View>
                    <View style={s.info}>
                        <Text style={s.title}>{clip.title}</Text>
                        <Text style={s.creator}>Fecha: {formatDateToGMTMinus3(clip.created_at)}</Text>
                        <Text style={s.creator}>Autor: {clip.creator.username}</Text>
                        <Text style={s.creator}>{clip.duration} segundos</Text>
                        <Text style={s.creator}>{clip.views} vistas</Text>
                    </View>
                </View>
            </View>
        </TouchableNativeFeedback>
    ) 
}

export default ClipCard

const s = StyleSheet.create({
    container: {
        backgroundColor: "#1c1c1c",
        flexDirection: "column",
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "#252525",

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