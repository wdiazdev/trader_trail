import Button from "@/components/Button"
import Container from "@/components/Container"
import Input from "@/components/Input"
import Text from "@/components/Text"
import { useState } from "react"
import { View } from "react-native"
import { useToast } from "../context/toastContext"
import { useAppContext } from "../store/storeContext"
import { CHANGE_STORE } from "../store/reducer"

interface AuthTypes {
  email: string
  password: string
}

export default function Home() {
  const { state, dispatch } = useAppContext()
  const { showToast } = useToast()

  const [inputValues, setInputValues] = useState<AuthTypes>({
    email: "",
    password: "",
  })

  const handleTextChange = (value: string, type: "email" | "password") => {
    setInputValues((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const clearValues = (type: "email" | "password") => {
    setInputValues((prev) => ({
      ...prev,
      [type]: "",
    }))
  }

  const handleLogin = () => {
    // dispatch({ type: "change_store", payload: { token: "testTOKEN" } })
    if (!inputValues.email || !inputValues.password) {
      showToast("error", "All fields are required!")
    }
    showToast("success", "Login successful!")
  }

  return (
    <Container paddingHorizontal={30}>
      <Text>Welcome back!</Text>
      <View style={{ flexDirection: "column", gap: 16, marginVertical: 10 }}>
        <Input
          value={inputValues.email}
          onChangeText={(value) => handleTextChange(value, "email")}
          clearValue={() => clearValues("email")}
          placeholder={"Email"}
          leftIconName={"mail"}
          rightIconVisible
        />
        <Input
          value={inputValues.password}
          onChangeText={(value) => handleTextChange(value, "password")}
          clearValue={() => clearValues("password")}
          placeholder="Password"
          leftIconName={"lock-closed"}
          rightIconVisible
        />
        <Button
          id="login"
          accessibilityLabel="login button"
          title={"Login"}
          onPress={handleLogin}
          disabled={!inputValues.email || !inputValues.password}
          // loading={false}
        />
      </View>
    </Container>
  )
}
