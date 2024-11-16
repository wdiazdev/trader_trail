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
  const [isLoading, setIsLoading] = useState(false)
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

  // const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const handleLogin = async () => {
    if (!inputValues.email || !inputValues.password) {
      showToast("error", "All fields are required!")
    }
    setIsLoading(true)
    // await delay(2000)
    try {
      const response = await fetch("http://10.0.2.2:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputValues.email,
          password: inputValues.password,
        }),
      })

      if (!response.ok) {
        showToast("error", "Login failed. Please try again.")
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const responseData = await response.json()
      dispatch({ type: "change_store", payload: { token: responseData.data.token } })
      showToast("success", "Login successful!")
    } catch (error: any) {
      console.error("Login failed:", error.message)
    }
    setIsLoading(false)
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
          loading={isLoading}
        />
      </View>
    </Container>
  )
}
