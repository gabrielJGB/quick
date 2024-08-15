import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Button, Divider, IconButton } from 'react-native-paper'
import { useSettings } from '../../context/SettingsProvider'

const Options = () => {

  const { back } = useRouter()
  const { setSelectedLanguage, setAccentColor, setVideoQuality, setInitialTab } = useSettings()
  const params = useLocalSearchParams()
  const section = JSON.parse(params.section)


  return (
    <View style={s.container}>
      <View style={s.header}>
        <IconButton icon="arrow-left" iconColor="white" onPress={() => back()} />
        <Text style={s.name}>{section.name}</Text>
      </View>
      <ScrollView>

        <View style={s.options}>

          {
            section.options.map((option, i) => (
              <View key={i} style={s.option}>
                <Divider style={{ backgroundColor: "#2c2c2c", width: "100%" }} />
                <Button
                  style={{ borderRadius: 0, width: "100%", justifyContent: "center" }}
                  buttonColor='back'
                  rippleColor='grey'
                  textColor='white'
                  contentStyle={s.buttonContent}
                  onPress={() => {

                    if (section.key === 0) {
                      setSelectedLanguage(option.code)

                    } else if (section.key === 1) {
                      setAccentColor(option.code)

                    } else if (section.key === 2) {
                      setVideoQuality(option.code)

                    } else if (section.key === 3) {
                      setInitialTab(option.code)
                    }
                    back()

                    // switch (section.key) { 
                    //   case 0:
                    //     setSelectedLanguage(option.code)
                    //   case 1:
                    //     setAccentColor(option.code)
                    //   case 2:
                    //     setVideoQuality(option.code) 
                    //   case 3:
                    //     setInitialTab(option.code)
                    //   default:
                    //     back()

                    // }
                  }}
                >
                  <View style={s.buttonBody}>

                    {
                      section.key === 1 &&
                      <View style={[s.dot, { backgroundColor: option.code }]}></View>
                    }

                    <Text style={s.optionText}>{option.name}</Text>

                  </View>
                </Button>
              </View>
            ))
          }

        </View>
      </ScrollView>
    </View>
  )
}

export default Options

const s = StyleSheet.create({
  container: {
    flexDirection: "column",



  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7
  },
  name: {
    fontWeight: "500",
    fontSize: 18,
    color: "white"
  },
  options: {

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  option: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%"
  },
  buttonContent: {
    paddingLeft: 5,
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  optionText: {
    fontSize: 13,
    color: "white"
  },
  buttonBody: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  }
})