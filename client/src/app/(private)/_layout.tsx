import { Tabs, useRouter } from "expo-router"
import useColorScheme from "@/src/hooks/useColorScheme"
import { useAppContext } from "@/src/store/storeContext"
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from "@/src/constants/Colors"
import { useEffect } from "react"
import Text from "@/src/components/Text"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function TabsLayout() {
  const { dispatch } = useAppContext()
  const colorScheme = useColorScheme()
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const storageToken = await AsyncStorage.getItem("token")
      if (!storageToken) {
        router.push("/")
      }
    })()
  }, [])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS[colorScheme].icon,
        tabBarInactiveTintColor: COLORS[colorScheme].altText,
        tabBarStyle: {
          backgroundColor: COLORS[colorScheme].background,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: true,
          headerTitle: () => <Text style={{ fontSize: 20 }}>Home</Text>,
          headerStyle: {
            backgroundColor: COLORS[colorScheme].background,
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          headerShown: true,
          headerTitle: () => <Text style={{ fontSize: 20 }}>Settings</Text>,
          headerStyle: {
            backgroundColor: COLORS[colorScheme].background,
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={22} color={color} />,
        }}
      />
    </Tabs>
  )
}
