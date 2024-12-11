import { Slot } from "expo-router"
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans"
import { useEffect } from "react"
import * as SplashScreen from "expo-splash-screen"
import { AppContextProvider } from "../store/storeContext"
import { ToastProvider } from "../context/toastContext"

// Prevent auto hide splash screen
SplashScreen.preventAutoHideAsync()

// Ignore logs
// LogBox.ignoreLogs([""])

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

  return (
    <AppContextProvider>
      <ToastProvider>
        <Slot />
      </ToastProvider>
    </AppContextProvider>
  )
}

export default function App() {
  return <InitialLayout />
}
