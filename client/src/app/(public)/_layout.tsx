import { Stack } from "expo-router"

export default function RootLayout() {
  return (
    <Stack screenOptions={{ animation: "ios_from_right" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}
