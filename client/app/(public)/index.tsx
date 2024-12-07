import Button from "@/components/Button"
import Container from "@/components/Container"
import Input from "@/components/Input"
import Text from "@/components/Text"
import { useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { useToast } from "../context/toastContext"
import { useAppContext } from "../store/storeContext"
import { useRouter } from "expo-router"
import { COLORS } from "@/constants/Colors"
import useColorScheme from "@/hooks/useColorScheme"
import agent from "../api/agent"

interface AuthTypes {
  email: string
  password: string
}

export default function Home() {
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

  const handleLogin = async () => {
    if (!inputValues.email || !inputValues.password) {
      showToast("error", "All fields are required!")
    }
    try {
      setIsLoading(true)
      const response = await agent.Account.login(inputValues)
      dispatch({
        type: "change_store",
        payload: { token: response.data.token, _id: response.data._id },
      })
      showToast("success", "Login successful!")
    } catch (error: any) {
      console.error("Login failed:", error.message)
    } finally {
      setIsLoading(false)
    }
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          position: "absolute",
          bottom: 60,
        }}
      >
        <Text>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => router.push("./signup")}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 14,
            backgroundColor: COLORS[colorScheme].primaryBtnBackground,
          }}
        >
          <Text style={{ color: COLORS[colorScheme].primaryBtnText }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Container>
  )
}
