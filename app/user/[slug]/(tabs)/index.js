import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { useStateContext } from '../../../../context/StateProvider'
import { useFocusEffect, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router'
import { Button, IconButton } from 'react-native-paper'
import { addUser, clearUsersFollowed, getUsersFollowed, removeUser, userExists } from '../../../../utils/storage'
import { fetchFollowers, fetchLivestream, fetchStreamerData, fetchStreamerLinks } from '../../../../utils/fetch'
import { useSettings } from '../../../../context/SettingsProvider'
import { transformURL } from '../../../../utils/stream'

const Card = ({ title, value, url }) => {

  return (
    <TouchableNativeFeedback onPress={() => Linking.openURL(`${url}${value}`)}>
      <View style={s.card}>
        <Text style={s.cardTitle}>{title}</Text>
        <Text selectable style={s.cardValue}>{value}</Text>
      </View>
    </TouchableNativeFeedback>
  )
}

const Info = () => {

  const { accentColor } = useSettings()
  const { back } = useRouter()
  const { slug } = useLocalSearchParams()
  const [streamerData, setStreamerData] = useState(false)
  const [streamerLinks, setStreamerLinks] = useState(false)
  const [livestreamData, setLivestreamData] = useState(false)
  const [followersCount, setFollowersCount] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { selectedProfile, setSelectedProfile, setSelectedStream, selectedStream, setHeaderData } = useStateContext()
  const [following, setFollowing] = useState(false)
  const [channelId, setChannelId] = useState(false)


  // const user = selectedProfile.channel.user
  // const profileUri = selectedProfile.channel.user.profilepic




  const checkFollowing = async (username) => {
    const followingUser = await userExists(username)
    setFollowing(followingUser)
    setFollowing(followingUser)
  }

  const manageFollowButton = async (username) => {

    const following = await userExists(username)

    if (following) {
      setFollowing(false)
      await removeUser(username)
    } else {
      setFollowing(true)
      await addUser({ id: username })
    }
  }


  useFocusEffect(useCallback(() => {
    checkFollowing(selectedProfile)
    checkFollowing(selectedProfile)
    setSelectedProfile(slug)


  }, [slug]))

  useEffect(() => {

    setLoading(true)
    fetchStreamerData(slug)
      .then(res => { setStreamerData(res) })
      .catch(error => {
        setError(error.message)
        setSelectedStream(false)
      })
      .finally(() => setLoading(false))

  }, [slug])

  useEffect(() => {

    setLoading(true)

    fetchLivestream(slug)
      .then(res => { setLivestreamData(res.data) })
      .catch(error => {
        setError(error.message)
        setSelectedStream(false)
      })
      .finally(() => setLoading(false))

  }, [slug])


  useEffect(() => {

    setLoading(true)
    fetchStreamerLinks(slug)
      .then(res => setStreamerLinks(res))
      .catch(error => {
        setError(error.message)
        setSelectedStream(false)
      })
      .finally(() => setLoading(false))

  }, [slug])


  useEffect(() => {

    setLoading(true)

    if (channelId)
      fetchFollowers(channelId)
        .then(res => { setFollowersCount(res) })
        .catch(error => { setError(error.message) })
        .finally(() => setLoading(false))

  }, [])


  // if (error)
  //   return <Text style={s.error}>Ha ocurrido un error </Text>


  return (
    <ScrollView >
      <View style={s.header}>
        <IconButton icon="arrow-left" iconColor="white" onPress={() => back()} />
        {
          !loading && selectedProfile != selectedStream &&
          <View style={s.info}>
            {
              !streamerData || loading ?
                <View style={s.profilePlaceholder}></View>
                :
                <Image
                  source={{ uri: transformURL(streamerData.profilepic) || streamerData.profilepic, "cache": "force-cache" }}
                  style={s.profileImg} />
            }
            <Text style={s.title1}>{slug}</Text>
          </View>
        }
      </View>
      <View style={s.container}>


        {
          streamerData.bio && streamerData.bio != "" &&
          <Text selectable style={s.bio}>{!loading && streamerData.bio}</Text>
        }

        {
          followersCount &&
          <Text style={s.followerCount}>{followersCount} seguidores</Text>
        }


        <Button
          icon={`heart${!following ? "-outline" : ""}`}
          onPress={() => manageFollowButton(selectedProfile)}
          buttonColor={accentColor}
          textColor='black'
          rippleColor="grey"
          style={{ borderRadius: 7, marginVertical: 12, width: 125 }}
        > {!following ? "Seguir" : "Siguiendo"} </Button>





        {
          livestreamData && selectedProfile != selectedStream &&

          <>


            <Text style={s.isLive}>Transmitiendo {livestreamData.category.name} para {livestreamData.viewers} espectadores </Text>

            <TouchableNativeFeedback onPress={() => {
              setSelectedStream(selectedProfile)
              setHeaderData({
                username: selectedProfile,
                profileUri: streamerData.profilepic,
                sessionTitle: livestreamData.session_title,
                category: livestreamData.category.name,
                viewers: livestreamData.viewers
              })
            }}>
              <View style={s.thumbnail}>


                {
                  livestreamData &&
                  <Image
                    source={{ uri: `${livestreamData.thumbnail.src.replace("720.", "160.")}?_=${new Date().getTime()}` }}
                    style={{ width: "62%", height: 140, borderRadius: 7, borderWidth: 1, borderColor: "grey" }}
                  />


                }


                <View style={s.liveContainer}>
                  <Text style={s.watchText}>EN VIVO</Text>
                  <Text style={[s.dot, { backgroundColor: accentColor }]}>{"."}</Text>
                </View>

              </View>
            </TouchableNativeFeedback>


          </>
        }



        <View style={s.cardContainer}>

          {
            streamerData.instagram && streamerData.instagram != "" &&
            <Card title="instagram" value={streamerData.instagram.replace("https://instagram.com/", "").replace("https://www.instagram.com/", "")} url="https://instagram.com/" />
          }

          {
            streamerData.youtube && streamerData.youtube != "" &&
            <Card title="youtube" value={streamerData.youtube.replace("https://www.youtube.com/", "")} url="https://www.youtube.com/" />
          }

          {
            streamerData.tiktok && streamerData.tiktok != "" &&
            <Card title="tiktok" value={streamerData.tiktok.replace("https://www.tiktok.com/@", "")} url="https://www.tiktok.com/@" />
          }

          {
            streamerData.tiktok && streamerData.twitter != "" &&
            <Card title="twitter" value={streamerData.twitter.replace("https://www.twitter.com/", "")} url="https://www.twitter.com/" />
          }

          {
            streamerData.facebook && streamerData.facebook != "" &&
            <Card title="facebook" value={streamerData.facebook.replace("https://www.facebook.com/", "")} url="https://www.facebook.com/" />
          }


        </View>

        <View style={s.linksContainer}>

          {
            streamerLinks.length > 0 ?
              streamerLinks.map((link, i) => (
                <View style={s.linkCard} key={i}>
                  {
                    link.title != "" &&
                    <Text style={s.linkTitle}>{link.title}</Text>
                  }

                  {
                    link.image != null && "url" in link.image && link.image.url != "" &&
                    <TouchableNativeFeedback onPress={() => link.link != "" && Linking.openURL(link.link)}>
                      <Image
                        source={{ uri: link.image.url }}
                        resizeMode='contain'
                        style={{ width: "100%", aspectRatio: 2.4 }}
                      />
                    </TouchableNativeFeedback>
                  }

                  {
                    link.description != "" &&
                    <Text style={s.linkDescription}>{link.description}</Text>

                  }


                </View>

              ))
              :
              <></>
          }

        </View>


      </View>

    </ScrollView>
  )
}

export default Info

const s = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingTop: 5,
    paddingHorizontal: 14,
    marginBottom: 100
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,

  },
  bio: {
    lineHeight: 18,
    marginVertical: 7,
    fontSize: 13,
    color: "white"
  },
  title1: {
    fontWeight: "500",
    color: "white",
    fontSize: 22,
    paddingBottom: 7,

  },
  title2: {
    fontWeight: "500",
    color: "white",
    marginTop: 11,
    marginBottom: 7


  },
  cardContainer: {
    marginTop: 22,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  card: {

    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    minWidth: 140,
    backgroundColor: "#1c1c1c",
    padding: 9,
    borderRadius: 8
  },
  cardTitle: {
    color: "grey",
    fontSize: 11,
    fontWeight: "500",
    textAlign: "left",
    textTransform: "uppercase"
  },
  cardValue: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  thumbnail: {
    marginTop: 10,
    flexDirection: "row",


  },
  watchText: {

    color: "white",
    fontWeight: "500",
    fontSize: 12
  },
  liveContainer: {

    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "grey"

  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,

  },
  isLive: {
    fontSize: 13,
    color: "grey",
    marginTop: 7,
    marginBottom: 2
  },
  profileImg: {
    width: 30,
    height: 30,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "grey"
  },
  profilePlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "grey"
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7
  },
  error: {
    color: "white",
    textAlign: "center",
    marginVertical: 12
  },
  linksContainer: {
    marginTop: 22,
    flexDirection: "column",
    gap: 16
  },
  linkCard: {
    flexDirection: "column",
    gap: 7,
    padding: 8,

    backgroundColor: "#1c1c1c",
    borderRadius: 7

  },
  linkTitle: {
    fontWeight: "500",
    fontSize: 18,
    color: "white"
  },
  linkDescription: {
    color: "white",
    fontSize: 13,
    lineHeight: 18
  },
  linkImg: {
    borderRadius: 5
  },
  followerCount: {
    marginTop: 6,
    color: "white"
  },

})