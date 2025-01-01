import React from "react"
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
import { StatusBar } from "react-native"
import useColorScheme from "../hooks/useColorScheme"
import { COLORS } from "../constants/Colors"
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Prevent auto hide splash screen
SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

const InitialLayout = () => {
  const colorScheme = useColorScheme()
  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  })

  useEffect(() => {
    const hideSplash = async () => {
      if (fontsLoaded) {
        try {
          await SplashScreen.hideAsync()
        } catch (e) {
          console.error("Error hiding splash screen:", e)
        }
      }
    }
    hideSplash()
  }, [fontsLoaded])

  return (
    <>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={COLORS[colorScheme].background}
      />
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <ToastProvider>
            <Slot />
          </ToastProvider>
        </AppContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default function App() {
  return <InitialLayout />
}
