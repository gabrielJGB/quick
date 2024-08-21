import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router/stack';
import { StateProvider } from '../context/StateProvider';
import { useCallback, useEffect, useState } from 'react';
import { fetchFeatured } from '../utils/fetch';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { useFocusEffect } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SettingsProvider } from '../context/SettingsProvider';
import { getSettings } from '../utils/storage';


export default function Layout() {




    const [selectedStream, setSelectedStream] = useState(false)
    const [headerData, setHeaderData] = useState(false)
    const [selectedProfile, setSelectedProfile] = useState(false)
    const [featuredStreams, setFeaturedStreams] = useState(false)
    const [loadingFeatured, setLoadingFeatured] = useState(true)
    const [error, setError] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState("")
    const [accentColor, setAccentColor] = useState("")
    const [videoQuality, setVideoQuality] = useState("")
    const [initialTab, setInitialTab] = useState("")
    const [refresh, setRefresh] = useState(false)
    const [loadingSettings, seLoadingSettings] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedPage,setSelectedPage] = useState(1)
    const [selectedOrder,setSelectedOrder] = useState("featured")
    const featuredCount = 42

    useEffect(() => {
        getSettings()
            .then(setting => {
                setSelectedLanguage(setting[0])
                setAccentColor(setting[1])
                setVideoQuality(setting[2])
                setInitialTab(setting[3])
            })
            .finally(() => seLoadingSettings(false))

    }, [])

    useFocusEffect(
        useCallback(() => {

            if (!loadingSettings) {
                setError(false)
                setLoadingFeatured(true)
                fetchFeatured(selectedLanguage,selectedCategory, featuredCount, selectedPage,selectedOrder)
                    .then(res => setFeaturedStreams(res.data))
                    .catch(error => setError(error.message))
                    .finally(() => {setLoadingFeatured(false)})
            }
        }, [selectedLanguage,selectedCategory,loadingSettings, refresh, selectedPage,selectedOrder]))

    if(loadingFeatured)
        return <ActivityIndicator size={22} color="white" style={{ marginVertical: 100, width: "100%" }} />

    if (error)
        return (
            <View style={s.container}>
                <View style={s.errorContainer}>
                    <Text style={s.errorTitle}>ERROR</Text>
                    <Text style={s.errorDescription}>{error}</Text>
                </View>
            </View>
        )
    return (

        <StateProvider value={{
            selectedStream, setSelectedStream,
            selectedProfile, setSelectedProfile,
            loadingFeatured,
            featuredStreams,
            headerData, setHeaderData,
            setRefresh,
            selectedCategory, setSelectedCategory,
            selectedPage,setSelectedPage,
            selectedOrder,setSelectedOrder
        }}>
            <ThemeProvider value={{
                dark: true,
                colors: { ...DarkTheme.colors }
            }}>

                <PaperProvider>
                    <SettingsProvider value={{
                        selectedLanguage, setSelectedLanguage,
                        accentColor, setAccentColor,
                        videoQuality, setVideoQuality,
                        initialTab, setInitialTab
                    }}>

                        {
                            selectedStream &&
                            <Header />
                        }

                        <Stack
                            screenOptions={{
                                animation: "slide_from_right",
                                statusBarColor: "black",
                                headerStyle: { backgroundColor: "black" },
                                headerTitle: "",
                                headerShown: false,
                            }}
                        >

                            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                            <Stack.Screen name="user/[slug]" options={{}} />


                        </Stack>
                    </SettingsProvider>
                </PaperProvider>
            </ThemeProvider>
        </StateProvider>
    );
}
const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1c1c1c"
    },
    errorContainer: {
        justifyContent: "flex-start",
        gap: 7,
        flexDirection: "column"
    },
    errorTitle: {
        textAlign: "center",
        fontSize: 23,
        color: "white"
    },
    errorDescription: {
        color: "#eeeeee",
        fontSize: 13,
    }
})