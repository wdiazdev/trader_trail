import Button from "@/src/shared/Button"
import Container from "@/src/shared/Container"
import Input from "@/src/shared/Input"
import Text from "@/src/shared/Text"
import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { useToast } from "../../context/toastContext"
import { Link, useRouter } from "expo-router"
import { COLORS } from "@/src/constants/Colors"
import useColorScheme from "@/src/hooks/useColorScheme"
import agent from "../../api/agent"
import { useAppContext } from "../../store/storeContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { shadowStyles } from "@/src/helpers/shadowStyles"
import Loader from "@/src/shared/Loader"
import DismissKeyboard from "@/src/shared/DismissKeyboard"

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
      const access_token = await AsyncStorage.getItem("access_token")
      if (!access_token) return
      try {
        setIsLoading(true)
        const response = await agent.Auth.getUser()
        dispatch({
          type: "change_store",
          payload: {
            user: {
              userId: response.data.userId,
              access_token: response.data.access_token,
            },
          },
        })
        await AsyncStorage.setItem("access_token", response.data.access_token)
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
          user: {
            userId: response.data.userId,
            access_token: response.data.access_token,
          },
          registrationEmail: null,
        },
      })
      await AsyncStorage.setItem("access_token", response.data.access_token)
      showToast("success", "Login successful!")
      router.push("/(private)/home")
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Login failed, please try again."
      showToast("error", errorMessage)
      console.log("Error:", error?.response?.data)
    } finally {
      setIsLoginLoading(false)
    }
  }

  return (
    <DismissKeyboard>
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
            returnKeyType="go"
            onSubmitEditing={handleLogin}
          />
          <Button
            id="login"
            accessibilityLabel="login button"
            title={"Login"}
            onPress={handleLogin}
            disabled={
              !inputValues.email || !inputValues.password || isLoginLoading
            }
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
              borderColor: "transparent",
              borderWidth: StyleSheet.hairlineWidth,
              fontSize: 16,
              fontWeight: "bold",
              backgroundColor: COLORS[colorScheme].blue,
              color: COLORS[colorScheme].primaryBtnText,
              ...shadowStyles(colorScheme),
            }}
          >
            Sign up
          </Link>
        </View>
      </Container>
    </DismissKeyboard>
  )
}
