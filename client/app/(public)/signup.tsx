import Button from "@/components/Button"
import Container from "@/components/Container"
import Input from "@/components/Input"
import Text from "@/components/Text"
import { useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { useToast } from "../context/toastContext"
import { useAppContext } from "../store/storeContext"
import { CHANGE_STORE } from "../store/reducer"
import { useRouter } from "expo-router"
import { COLORS } from "@/constants/Colors"
import useColorScheme from "@/hooks/useColorScheme"

interface AuthTypes {
  email: string
  password: string
}

export default function Signup() {
  const { state, dispatch } = useAppContext()
  const { showToast } = useToast()
  const router = useRouter()
  const colorScheme = useColorScheme()

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

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const handleSignup = async () => {
    if (!inputValues.email || !inputValues.password) {
      showToast("error", "All fields are required!")
    }
    // setIsLoading(true)
    // await delay(2000)
    // try {
    //   const response = await fetch("http://10.0.2.2:5000/api/auth/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: inputValues.email,
    //       password: inputValues.password,
    //     }),
    //   })

    //   if (!response.ok) {
    //     showToast("error", "Login failed. Please try again.")
    //     throw new Error(`Error: ${response.status} ${response.statusText}`)
    //   }

    //   const responseData = await response.json()
    //   dispatch({ type: "change_store", payload: { token: responseData.data.token } })
    //   showToast("success", "Login successful!")
    // } catch (error: any) {
    //   console.error("Login failed:", error.message)
    // }
    // setIsLoading(false)
  }

  return (
    <Container paddingHorizontal={30}>
      <Text>Hello! Register to get started</Text>
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
          id="signup"
          accessibilityLabel="signup button"
          title={"Sign Up"}
          onPress={handleSignup}
          disabled={!inputValues.email || !inputValues.password}
          loading={isLoading}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          position: "absolute",
          bottom: 60,
        }}
      >
        <Text>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 14,
            backgroundColor: COLORS[colorScheme].primaryBtnBackground,
          }}
        >
          <Text style={{ color: COLORS[colorScheme].primaryBtnText }}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </Container>
  )
}
