import Button from "@/src/components/Button"
import Container from "@/src/components/Container"
import Input from "@/src/components/Input"
import Text from "@/src/components/Text"
import { useEffect, useState } from "react"
import { View } from "react-native"
import { useToast } from "../../context/toastContext"
import { Link, useRouter } from "expo-router"
import { COLORS } from "@/src/constants/Colors"
import useColorScheme from "@/src/hooks/useColorScheme"
import agent from "../../api/agent"
import { useAppContext } from "../../store/storeContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { shadowStyles } from "@/src/helpers/shadowStyles"
import Loader from "@/src/components/Loader"

interface AuthTypes {
  email: string
  password: string
}

export default function Home() {
  const { state, dispatch } = useAppContext()
  const { registrationEmail } = state
  const { showToast } = useToast()
  const router = useRouter()
  const colorScheme = useColorScheme()

  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [inputValues, setInputValues] = useState<AuthTypes>({
    email: registrationEmail || "",
    password: "",
  })

  useEffect(() => {
    const getUser = async () => {
      const token = await AsyncStorage.getItem("token")
      if (!token) return
      try {
        setIsLoading(true)
        const response = await agent.Auth.getUser()
        dispatch({
          type: "change_store",
          payload: {
            user: { _id: response.data.userId, token: response.data.token },
          },
        })
        await AsyncStorage.setItem("token", response.data.token)
        router.push("/(private)/home")
      } catch (err) {
        console.log("err:", err)
      } finally {
        setIsLoading(false)
      }
    }
    getUser()
  }, [])

  if (isLoading) {
    return (
      <Container>
        <Loader size="large" />
      </Container>
    )
  }

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
      return
    }
    try {
      setIsLoginLoading(true)
      const response = await agent.Auth.login(inputValues)
      dispatch({
        type: "change_store",
        payload: {
          user: { _id: response.data.userId, token: response.data.token },
          registrationEmail: null,
        },
      })
      await AsyncStorage.setItem("token", response.data.token)
      showToast("success", "Login successful!")
      router.push("/(private)/home")
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Login failed, please try again."
      showToast("error", errorMessage)
      console.log("Error:", error?.response?.data)
    } finally {
      setIsLoginLoading(false)
    }
  }

  return (
    <Container paddingHorizontal={30}>
      <Text>Welcome back!</Text>
      <View style={{ flexDirection: "column", gap: 16, marginVertical: 10 }}>
        <Input
          id="email"
          accessibilityLabel="email input"
          value={inputValues.email}
          onChangeText={(value) => handleTextChange(value, "email")}
          clearValue={() => clearValues("email")}
          placeholder={"Email"}
          leftIconName={"mail"}
          rightIconVisible
        />
        <Input
          id="password"
          accessibilityLabel="password input"
          value={inputValues.password}
          onChangeText={(value) => handleTextChange(value, "password")}
          clearValue={() => clearValues("password")}
          placeholder="Password"
          leftIconName={"lock-closed"}
          rightIconVisible
          secureTextEntry={true}
        />
        <Button
          id="login"
          accessibilityLabel="login button"
          title={"Login"}
          onPress={handleLogin}
          disabled={!inputValues.email || !inputValues.password || isLoginLoading}
          loading={isLoginLoading}
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
        <Link
          id="signup"
          accessibilityLabel="signup link"
          href="/signup"
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "transparent",
            backgroundColor: COLORS[colorScheme].primaryBtnBackground,
            color: COLORS[colorScheme].primaryBtnText,
            ...shadowStyles(colorScheme),
          }}
        >
          Sign up
        </Link>
      </View>
    </Container>
  )
}
