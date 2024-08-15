import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { fetchLivestream, fetchUser } from '../../utils/fetch';
import { getUsersFollowed } from '../../utils/storage';
import ColumnsButton from '../../components/ColumnsButton';
import { useFocusEffect } from 'expo-router';
import StreamCard from '../../components/StreamCard';
import { useStateContext } from '../../context/StateProvider';


export default function Tab() {

  const { selectedProfile, selectedStream } = useStateContext()
  const [twoColumns, setTwoColumns] = useState(true)
  const [liveChannels, setLiveChannels] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    setLiveChannels([])
    getLiveChannels()


  }, [])



  const getLiveChannels = async () => {

    setLoading(true)
    const users = await getUsersFollowed()
    const arr = []

    
    if (users.length > 0){

    
      users.forEach((user, i) => {

        fetchLivestream(user.id)
          .then(res => res.data != null && arr.push({ ...res.data, username: user.id }))
          .then(() => setLiveChannels(arr.sort((a, b) => { return b.viewers - a.viewers })))
          .then(() => setLoading(prev => (users.length - 1) === i ? false : prev))
          .catch(error => setError(error))
      })
    }
    else{
      
      setLoading(false)
    }
  }


  if (error)
    <Text style={{ color: "white", padding: 7 }}>{error.message}</Text>




  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={getLiveChannels} />
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
            <ActivityIndicator size={22} color="white" style={{ marginTop: 40, width: "100%" }} />
          }

          {
            !loading && liveChannels.length > 0 ?

              liveChannels.map((item, i) => (
                <StreamCard
                  key={i}
                  category={item.category.name}
                  channelId={1}
                  profileUri={false}
                  thumbnailUri={`${item.thumbnail.src.replace("720.", "160.")}?_=${new Date().getTime()}`}
                  sessionTitle={item.session_title}
                  username={item.username}
                  viewers={item.viewers}
                  twoColumns={twoColumns}

                />
              ))
              : <></>
          }

          {
            !loading && liveChannels.length === 0 ?
              <Text style={s.empty}>No hay canales en vivo</Text>
              : <></>
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
  }
});
