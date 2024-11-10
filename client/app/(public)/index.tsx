import Container from "@/components/Container"
import Input from "@/components/Input"
import { COLORS } from "@/constants/Colors"
import useColorScheme from "@/hooks/useColorScheme"
import { Ionicons } from "@expo/vector-icons"
import { Text, View } from "react-native"

export default function Index() {
  const colorScheme = useColorScheme()
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Container paddingHorizontal={30}>
        <Text>Starter RN App</Text>
        <Input
          placeholder={"Email"}
          IconComponent={
            <Ionicons
              name="mail"
              color={COLORS[colorScheme].icon}
              size={16}
              style={{ marginHorizontal: 6, marginTop: 1 }}
            />
          }
        />
      </Container>
    </View>
  )
}
