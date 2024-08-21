import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router'

const ImagePage = () => {
    const { back } = useRouter()
    const {imageUri} = useLocalSearchParams()
    

    return (
        <View style={s.container}>
            <View style={s.header}>
                <IconButton icon="arrow-left" iconColor="white" onPress={() => back()} />
                <Text style={s.headerTitle}>Volver</Text>
            </View>

            <Image source={{ uri: imageUri }} style={s.image} />

        </View>
    )
}

export default ImagePage

const s = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 10
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 0,

    },
    headerTitle: {
        color: "white",
        fontSize: 17,
        fontWeight: "500"

    },
    image: {
        width: "100%",
        height:360,

    }
})