import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../../../context/StateProvider'
import { fetchUserClips } from '../../../../utils/fetch'
import { ActivityIndicator } from 'react-native-paper'
import ClipCard from '../../../../components/ClipCard'
import SortPicker from '../../../../components/SortPicker'

const Clips = () => {
  const { selectedProfile } = useStateContext()

  const [time, setTime] = useState("day")
  const [clips, setClips] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {

    setLoading(true)
    fetchUserClips(selectedProfile, time) //day,month,all
      .then(res => setClips(res.clips))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false))

  }, [selectedProfile, time])


  return (
    <ScrollView>
      <View style={s.container}>
        <View style={s.header}>

          <Text style={s.title}>Clips</Text>
        </View>
        <SortPicker time={time} setTime={setTime} />

        {
          loading &&
          <ActivityIndicator size={22} color="white" style={{ marginTop: 40 }} />
        }

        {
          !loading && clips.length > 0 &&

          <View style={s.clipsContainer}>
            {
              clips.map((clip, i) => (
                <ClipCard key={i} clip={clip} />
              ))
            }
          </View>


        }

        {
          !loading && clips.length === 0 &&
          <Text style={s.text}>No hay clips</Text>
        }


      </View>
    </ScrollView>
  )
}

export default Clips

const s = StyleSheet.create({
  container: {
    margin: 7,
    marginBottom: 100
  },
  text: {
    textAlign: "center",
    marginTop: 200,
    color: "white"
  },
  clipsContainer: {
    flexDirection: "column",
    gap: 22,
  },
  title: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    marginVertical: 7
  },
  header: {



  }
})