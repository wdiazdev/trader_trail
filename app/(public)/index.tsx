import { useOAuth } from "@clerk/clerk-expo"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import useColorScheme from "@/hooks/useColorScheme"
import { COLORS } from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"

export default function Index() {
  const colorScheme = useColorScheme()

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" })

  const handleGoogleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await googleAuth()
      if (createdSessionId) {
        setActive!({ session: createdSessionId })
      }
    } catch (error) {
      console.log("OAuth error:", error)
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }}
        style={{ width: "100%", height: 350, resizeMode: "cover" }}
      />
      <ScrollView style={{ width: "100%", padding: 14 }}>
        <Text style={styles.title}>How would you like to sign in?</Text>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.loginButton} onPress={handleGoogleLogin}>
            <View
              style={{
                gap: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("@/assets/images/google.png")}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <Text style={{ fontFamily: "DMSans_400Regular", flex: 1 }}>Continue with Google</Text>
              <Ionicons name="chevron-forward" color={"gray"} size={24} />
            </View>
            <Text
              style={{
                fontFamily: "DMSans_400Regular",
                fontSize: 12,
                paddingHorizontal: 6,
                color: "gray",
              }}
            >
              Join us! Log in or sign up with your Google account to access all features.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  title: {
    fontFamily: "DMSans_700Bold",
    fontSize: 16,
    textAlign: "center",
    paddingBottom: 14,
  },
  loginButton: {
    width: "100%",
    padding: 20,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#fff",
  },
})
