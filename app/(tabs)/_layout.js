import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useNavigation } from 'expo-router';
import { SafeAreaView, Text, View } from 'react-native';
import Header from '../../components/Header';
import { useStateContext } from '../../context/StateProvider';
import { Icon } from 'react-native-paper';
import { useSettings } from '../../context/SettingsProvider';
import { useEffect } from 'react';

export default function TabLayout() {


  const { accentColor, initialTab } = useSettings()
  const { navigate } = useNavigation()
  const iconSize = 26

  useEffect(() => {

    if (initialTab === "following")
      navigate("following")

  }, [initialTab])



  return (
    <>


      <Tabs screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: accentColor,
        tabBarLabelStyle: { fontSize: 11 },
        tabBarStyle: { height: 63, paddingBottom: 12 },
      }}


      >

        <Tabs.Screen
          name="index"
          options={{
            title: 'Destacados',
            tabBarIcon: ({ color }) => <Icon source="chart-line" size={iconSize} color={color} />,

          }}
        />
        <Tabs.Screen
          name="following"
          options={{
            title: 'Siguiendo',
            tabBarIcon: ({ color }) => <Icon source="heart" size={iconSize} color={color} />,

          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: 'Buscar',
            tabBarIcon: ({ color }) => <Icon source="magnify" size={iconSize} color={color} />,
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: 'Configuración',
            tabBarIcon: ({ color }) => <Icon source="cog" size={iconSize} color={color} />,
          }}
        />


      </Tabs>

    </>
  );
}
