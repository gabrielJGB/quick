import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Tabs, useNavigation } from 'expo-router'
import { Icon } from 'react-native-paper';
import { useStateContext } from '../../../../context/StateProvider';
import { useSettings } from '../../../../context/SettingsProvider';


const Layout = () => {
    const iconSize = 25

    const { accentColor } = useSettings()
    const { selectedProfile, selectedStream } = useStateContext()
    const { navigate } = useNavigation()

    useEffect(() => {

        if (selectedProfile === selectedStream) {
            navigate("chat")
        }
        
        

    }, [])

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: accentColor,
            headerStyle: { backgroundColor: "black" },
            tabBarLabelStyle: { fontSize: 11 },
            tabBarStyle: { height: 63, paddingBottom: 12 },
        }}
            backBehavior='none'
        >

            <Tabs.Screen
                name="index"
                options={{
                    title: 'Sobre',
                    tabBarIcon: ({ color }) => <Icon source="account-details" size={iconSize} color={color} />,
                }}
            />
            <Tabs.Screen
                name="clips"
                options={{
                    title: 'Clips',
                    tabBarIcon: ({ color }) => <Icon source="movie" size={iconSize} color={color} />,
                }}
            />
            <Tabs.Screen
                name="vods"
                options={{
                    title: 'Vods',
                    tabBarIcon: ({ color }) => <Icon source="video" size={iconSize} color={color} />,
                }}
            />

            <Tabs.Screen
                name="chat"
                options={{
                    title: 'Chat',
                    tabBarIcon: ({ color }) => <Icon source="message" size={iconSize} color={color} />,
                }}
            />


        </Tabs>
    )
}

export default Layout

const styles = StyleSheet.create({})