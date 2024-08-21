import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, TouchableNativeFeedback } from 'react-native';
import { fetchLivestream, fetchUser } from '../../utils/fetch';
import { getUsersFollowed } from '../../utils/storage';
import ColumnsButton from '../../components/ColumnsButton';
import { useFocusEffect, useRouter } from 'expo-router';
import StreamCard from '../../components/StreamCard';
import { useStateContext } from '../../context/StateProvider';
import { getTimeString } from '../../utils/time';
import { TouchableRipple } from 'react-native-paper';


export default function Tab() {

  const { selectedProfile, setSelectedProfile } = useStateContext()
  const [twoColumns, setTwoColumns] = useState(true)
  const [liveChannels, setLiveChannels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false);
  const [offArr, setOffArr] = useState([])
  const { push } = useRouter()


  useEffect(() => {
    
    getLiveChannels()
  }, [selectedProfile])

  useFocusEffect(useCallback(() => {
    
    
  }, []))


  const getLiveChannels = async () => {

    const users = await getUsersFollowed()
    const liveArr = []
    setOffArr([])

    if (users.length > 0) {


      users.forEach((user, i) => {
        setLoading(true)

        fetchLivestream(user.id)
          .then(res => res.data != null ? liveArr.push({ ...res.data, username: user.id }) : setOffArr(prev => [...prev, user.id]))
          .then(() => setLiveChannels(liveArr.sort((a, b) => { return b.viewers - a.viewers })))
          .then(() => setLoading(prev => (users.length - 1) === i ? false : prev))
          .catch(error => setError(error))
      })
    }
    else {

      setLoading(false)
    }
  }


  if (error)
    <Text style={{ color: "white", padding: 7 }}>{error.message}</Text>




  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={false} onRefresh={getLiveChannels} />
    }>
      <View style={s.container}>

        <View style={s.header}>
          <Text>{"     "}</Text>
          <Text style={s.title}>Siguiendo</Text>
          <ColumnsButton twoColumns={twoColumns} setTwoColumns={setTwoColumns} />
        </View>

        <View style={[s.liveContainer, { marginLeft: twoColumns ? 5 : 10 }]}>


          {
            loading &&
            <ActivityIndicator size={22} color="white" style={{ marginVertical: 40, width: "100%" }} />
          }

          {
            !loading && liveChannels.length > 0 ?

              liveChannels.map((item, i) => (
                <StreamCard
                  key={i}
                  category={item.category.name}
                  channelId={1}
                  profileUri={false}
                  thumbnailUri={`${item.thumbnail.src.replace("720.", !twoColumns ? "360." : "160.")}?_=${new Date().getHours()}${new Date().getMinutes()}`}
                  sessionTitle={item.session_title}
                  username={item.username}
                  viewers={item.viewers}
                  twoColumns={twoColumns}
                  liveTime={getTimeString(item.created_at, 0)}
                />
              ))
              : <></>
          }



          {
            !loading && liveChannels.length === 0 ?
              <Text style={s.empty}>No hay canales en vivo</Text>
              : <></>
          }


          {
            !loading &&
            <View style={s.offlineContainer}>
              <Text style={s.offlineTitle}>Offline</Text>
              {
                offArr.map((elem, i) => (
                  <TouchableNativeFeedback
                    key={i}
                    onPress={() => {
                      setSelectedProfile(elem)
                      push(`user/${elem}`)
                    }}
                  >
                    <Text key={i} style={s.offlineElem}>{elem}</Text>
                  </TouchableNativeFeedback>
                ))
              }
            </View>
          }
        </View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 100

  },
  liveContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 10,


  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    color: "white",


  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    marginVertical: 12,

  },
  username: {
    backgroundColor: "#1c1c1c",
    color: "white",
    padding: 7
  },
  empty: {
    width: "100%",
    color: "#a7a7a7",
    textAlign: "center",
    marginTop: 150
  },
  offlineTitle: {
    width: "95%",
    color: "white",
    fontSize: 22,
    fontWeight: "500",
    marginTop: 30,
    marginLeft: 4

  },
  offlineElem: {
    color: "#d1d1d1",
    padding: 6,
    borderRadius: 7,
    backgroundColor: "#1c1c1c",
    fontSize: 12,
  },
  offlineContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    marginHorizontal: 7,

  }
});
