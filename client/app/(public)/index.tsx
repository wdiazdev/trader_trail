import Button from "@/components/Button"
import Container from "@/components/Container"
import Input from "@/components/Input"
import Text from "@/components/Text"
import { useState } from "react"
import { View } from "react-native"

export default function Index() {
  const [inputValue, setInputValue] = useState("")

  const handleTextChange = (text: string) => {
    setInputValue(text)
  }
  return (
    <Container paddingHorizontal={30}>
      <Text>Welcome back!</Text>
      <View style={{ flexDirection: "column", gap: 16, marginVertical: 10 }}>
        <Input onChangeText={handleTextChange} placeholder={"Email"} leftIconName={"mail"} />
        <Input placeholder="Password" leftIconName={"lock-closed"} rightIconVisible />
        <Button title={"Login"} />
      </View>
    </Container>
  )
}
