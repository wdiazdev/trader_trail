import { Tabs, useRouter } from "expo-router"
import useColorScheme from "@/src/hooks/useColorScheme"
import { useAppContext } from "@/src/store/storeContext"
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from "@/src/constants/Colors"
import { useEffect } from "react"
import Text from "@/src/shared/Text"

export default function TabsLayout() {
  const { state } = useAppContext()
  const colorScheme = useColorScheme()
  const router = useRouter()

  useEffect(() => {
    const verifyUser = async () => {
      if (!state.user) {
        router.push("/")
      }
    }
    verifyUser()
  }, [])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS[colorScheme].icon,
        tabBarInactiveTintColor: COLORS[colorScheme].altText,
        tabBarStyle: {
          backgroundColor: COLORS[colorScheme].secondaryBackground,
          height: 70,
        },
        tabBarItemStyle: {
          margin: 16,
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
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={26} color={color} />
          ),
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
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
