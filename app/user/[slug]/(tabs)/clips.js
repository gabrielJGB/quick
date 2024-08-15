import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../../../context/StateProvider'
import { fetchUserClips } from '../../../../utils/fetch'
import { ActivityIndicator } from 'react-native-paper'
import ClipCard from '../../../../components/ClipCard'

const Clips = () => {
  const { selectedProfile } = useStateContext()


  const [clips, setClips] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {


    fetchUserClips(selectedProfile)
      .then(res => setClips(res.clips))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false))

  }, [selectedProfile])

  if (loading)
    return <ActivityIndicator size={22} color="white" style={{ marginTop: 40 }} />

  return (
    <ScrollView>
      <View style={s.container}>
      <Text style={s.title}>Últimos Clips</Text>
        
        {
          clips.length > 0 ?

            <View style={s.clipsContainer}>
              {
                clips.map((clip, i) => (
                  <ClipCard key={i} clip={clip} />
                ))
              }
            </View>

            :
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
    marginBottom:100
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
  title:{
    color:"white",
    fontSize:22,
    textAlign:"center",
    marginVertical:7
  }
})