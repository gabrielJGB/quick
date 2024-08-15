import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useStateContext } from '../../context/StateProvider'
import { WebView } from 'react-native-webview'
import { Button, DefaultTheme, Dialog, Divider, Icon, List, Portal, Switch, RadioButton, TouchableRipple } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useSettings } from '../../context/SettingsProvider'
import languages from '../../languages.json'

const Settings = () => {

  const { push } = useRouter()
  const { selectedLanguage, accentColor, videoQuality, initialTab } = useSettings()
  const currentSettingsValue = [selectedLanguage, accentColor, videoQuality, initialTab]

  const sections = [
    {
      key: 0,
      name: "Idioma del contenido",
      options: languages,
    },
    {
      key: 1,
      name: "Color principal",
      options: [
        { code: "#00ff00", name: "Verde" },
        { code: "#ff27ff", name: "Fucsia" },
        { code: "#d8151a", name: "Rojo" },
        { code: "#ffff11", name: "Amarillo" },
        { code: "#ffa500", name: "Naranja" },
        { code: "#1e5df7", name: "Azul" },
        { code: "#19ffff", name: "Aqua" },
        { code: "#9b5aff", name: "Violeta" },

      ],
    },
    {
      key: 2,
      name: "Calidad del stream",
      options: [{ code: "1080", name: "1080p" }, { code: "720", name: "720p" }, { code: "480", name: "480p" }, { code: "360", name: "360p" }, { code: "160", name: "160p" }]
    },
    {
      key: 3,
      name: "Pestaña al iniciar",
      options: [{ code: "index", name: "Destacados" }, { code: "following", name: "Siguiendo" }]
    },
  ]

  return (
    <View style={s.container}>

      {
        sections.map((item, i) => (
          <View key={i} style={s.section}>

            <TouchableRipple
              onPress={() => {
                push({
                  pathname: "/options",
                  params: { section: JSON.stringify(sections[i]) }
                })
              }}
              rippleColor="grey"
              style={s.buttonContent}
            >

              <View style={s.button}>
                <Text style={s.name}>{item.name}</Text>
                <Text style={s.subname}>

                  {item.options.find(option => option.code === currentSettingsValue[i]).name}

                </Text>
              </View>

            </TouchableRipple>

            <Divider style={{ backgroundColor: "#2c2c2c", width: "100%" }} />
          </View>
        ))
      }

    </View>

  )
}

export default Settings

const s = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 15,

  },
  section: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%"
  },
  buttonContent: {
    width: "100%",
    paddingVertical: 16,
    paddingLeft: 12
  },
  button: {
    // paddingTop: 10
  },
  name: {
    fontWeight: "500",
    fontSize: 15,
    color: "white"
  },
  subname: {
    fontSize: 13,
    color: "grey"
  },
  optionTitle: {
    color: "white"
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2
  }
})