import { Slot } from "expo-router"
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo"
import { tokenCache } from "@/utils/cache"
import { LogBox } from "react-native"
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans"
import { useEffect } from "react"
import * as SplashScreen from "expo-splash-screen"

// Prevent auto hide splash screen
SplashScreen.preventAutoHideAsync()

LogBox.ignoreLogs(["Clerk has been loaded with development keys"])

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

const InitialLayout = () => {
  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  })

  useEffect(() => {
    if (!fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  return <Slot />
}

export default function RootLayout() {
  if (!clerkPublishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
    )
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <InitialLayout />
      </ClerkLoaded>
    </ClerkProvider>
  )
}
