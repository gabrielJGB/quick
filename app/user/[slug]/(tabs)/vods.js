import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../../../context/StateProvider'
import { fetchUserClips, fetchUserVideos } from '../../../../utils/fetch'
import { ActivityIndicator, Title } from 'react-native-paper'
import VideoCard from '../../../../components/VideoCard'


const Vods = () => {
  const { selectedProfile } = useStateContext()
  const [videos,setVideos] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {


    fetchUserVideos(selectedProfile)
      .then(res => setVideos(res))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false))

  }, [selectedProfile])

  if (loading)
    return <ActivityIndicator size={22} color="white" style={{ marginTop: 40 }} />

  return (
    <ScrollView>
      <View style={s.container}>
        <Text style={s.title}>Vods</Text>
        {
          videos.length > 0 ?

            <View style={s.clipsContainer}>
              {
                videos.map((video, i) => (
                  <VideoCard key={i} video={video} />
                ))
              }
            </View>

            :
            <Text style={s.text}>No hay vods</Text>
        }
      </View>
    </ScrollView>
  )
}

export default Vods

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