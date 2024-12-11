import Text from "@/src/components/Text"
import { router, Stack } from "expo-router"
import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import useColorScheme from "@/src/hooks/useColorScheme"
import { COLORS } from "@/src/constants/Colors"

export default function PublicLayout() {
  const colorScheme = useColorScheme()
  return (
    <Stack screenOptions={{ animation: "ios" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "",
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS[colorScheme].background,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Ionicons
                name="chevron-back-circle-outline"
                size={24}
                color={COLORS[colorScheme].text}
              />
              <Text style={{ fontSize: 16 }}>Sign in</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  )
}
