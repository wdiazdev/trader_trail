import { Stack } from "expo-router"

export default function RootLayout() {
  return (
    <Stack screenOptions={{ animation: "ios", headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  )
}
