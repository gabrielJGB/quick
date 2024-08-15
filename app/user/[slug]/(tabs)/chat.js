import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview'
import { useStateContext } from '../../../../context/StateProvider'
import { useLocalSearchParams } from 'expo-router'

const Chat = () => {

  const { selectedProfile } = useStateContext()



  return (

    <WebView
      id={selectedProfile}
      style={s.webview}
      source={{ uri: `https://kick.com/${selectedProfile}/chatroom` }}
      
    />

  )
}

export default Chat

const s = StyleSheet.create({
  webview: {
    backgroundColor:"#1c1c1c",
    flex: 1,
  },
  title: {
    fontSize: 15,
    textAlign: "center",
    marginHorizontal: 10,
    marginTop: 250,
    color: "white"

  }
})