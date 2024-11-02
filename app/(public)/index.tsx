import { useOAuth } from "@clerk/clerk-expo"
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import useColorScheme from "@/hooks/useColorScheme"
import { COLORS } from "@/constants/Colors"

export default function Index() {
  const colorScheme = useColorScheme()

  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  })

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }}
        style={{ width: "100%", height: 350, resizeMode: "cover" }}
      />
      <ScrollView>
        <Text style={styles.title}>How would you like to sign in?</Text>
        <View style={{ alignItems: "center" }}>
          <Pressable style={styles.loginButton}>
            <Text>Continue with Google</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  title: {
    fontFamily: "DMSans_700Bold",
    fontSize: 16,
    alignSelf: "center",
    marginVertical: 8,
  },
  loginButton: {
    padding: 20,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#fff",
  },
})
