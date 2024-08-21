
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList, RefreshControl } from 'react-native';
import { useStateContext } from '../../context/StateProvider';
import StreamCard from '../../components/StreamCard';
import ColumnsButton from '../../components/ColumnsButton';
import { useState } from 'react';
import CategoryPicker from '../../components/CategoryPicker';
import { IconButton } from 'react-native-paper';
import { getTimeString } from '../../utils/time';
import OrderPicker from '../../components/OrderPicker';

export default function Tab() {

  const { featuredStreams, loadingFeatured, setRefresh, selectedPage, setSelectedPage } = useStateContext()
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

        <View style={s.pickerContainer}>
          <CategoryPicker />
          <OrderPicker />
        </View>
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
                      liveTime={getTimeString(stream.created_at, -3)}
                    />
                  ))
                  :
                  <Text style={{ color: "grey", width: "100%", textAlign: "center", marginTop: 140 }}>No hay canales en vivo</Text>
              }

            </View>

        }


        <View style={s.arrows}>
          {
            selectedPage > 1 ?
              <IconButton
                onPress={() => { setSelectedPage(prev => prev - 1) }}
                icon="chevron-left"
                iconColor='white'
                size={22}
              />
              : <View style={{ width: 50 }}></View>

          }
          <Text onPress={() => setSelectedPage(1)} style={s.pageText}>Página {selectedPage}</Text>

          <IconButton
            onPress={() => { setSelectedPage(prev => prev + 1) }}
            icon="chevron-right"
            iconColor='white'
            size={22}
          />

        </View>

      </View>


    </ScrollView>

  );
}

const s = StyleSheet.create({
  arrows: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    padding: 7,
  },
  pageText: {
    color: "grey",
    fontSize: 15,
  },
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

  },
  pickerContainer:{
    width:"100%",
    flexDirection:"row"
  }
});
