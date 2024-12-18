import { Tabs, useRouter } from "expo-router"
import useColorScheme from "@/src/hooks/useColorScheme"
import { useAppContext } from "@/src/store/storeContext"
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from "@/src/constants/Colors"
import { useEffect } from "react"

export default function TabsLayout() {
  const { state } = useAppContext()
  const colorScheme = useColorScheme()
  const router = useRouter()

  useEffect(() => {
    const token = state.user?.token
    if (!token) {
      router.push("/")
    }
  }, [state.user?.token])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS[colorScheme].icon,
        tabBarInactiveTintColor: COLORS[colorScheme].inputPlaceholder,

        tabBarStyle: {
          backgroundColor: COLORS[colorScheme].background,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",

          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Settings",
          tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={22} color={color} />,
        }}
      />
    </Tabs>
  )
}
