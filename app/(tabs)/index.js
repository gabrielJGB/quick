
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList, RefreshControl } from 'react-native';
import { useStateContext } from '../../context/StateProvider';
import StreamCard from '../../components/StreamCard';
import ColumnsButton from '../../components/ColumnsButton';
import { useState } from 'react';
import CategoryPicker from '../../components/CategoryPicker';

export default function Tab() {

  const { featuredStreams, loadingFeatured, setRefresh } = useStateContext()
  const [twoColumns, setTwoColumns] = useState(true)

  return (

    <ScrollView refreshControl={
      <RefreshControl refreshing={false} onRefresh={() => setRefresh(prev => !prev)} />
    }>

      <View style={s.container}>


        <View style={s.header}>

          <Text>{"     "}</Text>
          <Text style={s.title}>Canales destacados</Text>

          <ColumnsButton twoColumns={twoColumns} setTwoColumns={setTwoColumns} />
        </View>


        <CategoryPicker />


        {
          loadingFeatured ?
            <ActivityIndicator size={22} color="white" style={{ width: "99%", marginTop: 50 }} />
            :
            <View style={[s.cardsContainer, { marginLeft: twoColumns ? 5 : 10 }]}>


              {
                featuredStreams && featuredStreams.length != 0 ?
                  featuredStreams.map((stream, i) => (
                    <StreamCard
                      key={i}
                      username={stream.channel.user.username}
                      sessionTitle={stream.session_title}
                      category={stream.categories[0].name}
                      thumbnailUri={`${stream.thumbnail.src.replace("720.", !twoColumns ? "360." : "160.")}?_=${new Date().getTime()}`}
                      viewers={stream.viewer_count}
                      profileUri={stream.channel.user.profilepic}
                      channelId={stream.channel.id}
                      twoColumns={twoColumns}
                    />
                  ))
                  :
                  <Text style={{ color: "grey", width: "100%", textAlign: "center", marginTop: 140 }}>No hay canales en vivo</Text>
              }

            </View>

        }

      </View>
    </ScrollView>

  );
}

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 200,

  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    color: "white",


  },
  cardsContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 10,


  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    marginVertical: 12,

  }
});
