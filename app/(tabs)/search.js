import { Image, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Icon, IconButton, TextInput } from 'react-native-paper';
import { fetchSearchQuery } from '../../utils/fetch';
import { useStateContext } from '../../context/StateProvider';
import { useFocusEffect, useRouter } from 'expo-router';
import { useSettings } from '../../context/SettingsProvider';
import { DarkTheme } from '@react-navigation/native';

const SearchTab = () => {
    const profileImgSize = 32
    const textInput = useRef()
    const { push } = useRouter()
    const { setSelectedProfile, setSelectedStream } = useStateContext()
    const { accentColor } = useSettings()
    const [text, setText] = useState("");
    const [results, setResults] = useState(false)
    const [loading, setLoading] = useState(false)



    const manageSearch = (text) => {

        fetchSearchQuery(text)
            .then(res => setResults(res))
            .finally(() => setLoading(false))
    }


    const onSubmit = () => {

        if (text != "") {
            manageSearch(text)
            setLoading(true)
        }

    }

    useFocusEffect(useCallback(() => {
        textInput.current.focus()
        setText("")
        setResults(false)
    }, []))


    useEffect(() => {
        if(text === "")
            setResults(false)
    }, [text])
    

    return (
        <View style={s.container}>

            <TextInput
                ref={textInput}
                label="Buscar"
                value={text}
                activeUnderlineColor={accentColor}
                style={{ backgroundColor: "#1c1c1c" }}
                textColor='white'
                placeholderTextColor='grey'
                enablesReturnKeyAutomatically
                onSubmitEditing={onSubmit}
                right={<TextInput.Icon icon="magnify" color="white" onPress={onSubmit} />}
                onChangeText={text => setText(text)}
            />

            {
                loading ?
                    <ActivityIndicator size={22} color="white" style={{ marginTop: 40 }} /> : <></>
            }

            {
                !loading ?
                    <ScrollView>
                        <View style={s.resultsContainer}>

                            {
                                results &&
                                results.channels.map((channel, i) => (
                                    <TouchableNativeFeedback key={i} onPress={() => {
                                        setSelectedProfile(channel.user.username)
                                        push(`user/${channel.user.username}?channelId=${channel.id}`)
                                    }}>
                                        <View style={s.channel}>
                                            <View style={s.left}>
                                                <Image source={{ uri: channel.user.profilePic }} style={[s.profileImg, { width: profileImgSize, height: profileImgSize }]} />
                                                <Text style={s.result}>{channel.user.username}</Text>

                                                {
                                                    channel.verified != null &&
                                                    <Icon source="checkbox-marked-circle" color={accentColor} size={16} />
                                                }
                                            </View>
                                            <View style={s.right}>
                                                {
                                                    channel.is_live &&
                                                    <Text style={s.liveText}>EN VIVO</Text>

                                                }
                                            </View>
                                        </View>
                                    </TouchableNativeFeedback>
                                ))

                            }

                            {

                                results && results.channels.length === 0 &&
                                <Text style={s.noResult}>Sin resultados</Text>

                            }

                        </View>
                    </ScrollView> : <></>
            }

        </View>
    )
}

export default SearchTab

const s = StyleSheet.create({
    container: {
        flexDirection: "column",
        marginTop: 8,
        marginHorizontal: 10
    },
    resultsContainer: {
        flexDirection: "column",
        gap: 9,
        marginTop: 12,
        marginBottom: 100
    },
    channel: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 7,
        backgroundColor: "#1c1c1c",
        borderRadius: 10,
        paddingVertical: 13,
        paddingHorizontal: 7,
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },
    liveText: {
        backgroundColor: "#cc0004",
        color: "white",
        borderRadius: 3,
        padding: 3,
        fontWeight: "600",
        fontSize: 11
    },
    result: {
        fontSize: 14,
        color: "white"
    },
    profileImg: {
        alignSelf: "flex-start",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10
    },
    noResult: {
        marginTop: 100,
        textAlign: "center",
        color: "white"
    }

})