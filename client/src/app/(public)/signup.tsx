import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Link, useRouter } from "expo-router"
import Button from "@/src/shared/Button"
import Container from "@/src/shared/Container"
import Input from "@/src/shared/Input"
import Text from "@/src/shared/Text"
import { useToast } from "../../context/toastContext"
import agent from "../../api/agent"
import { useAppContext } from "../../store/storeContext"
import { COLORS } from "@/src/constants/Colors"
import useColorScheme from "@/src/hooks/useColorScheme"
import { shadowStyles } from "@/src/helpers/shadowStyles"
import DismissKeyboard from "@/src/shared/DismissKeyboard"

interface AuthTypes {
  email: string
  password: string
}

export default function Signup() {
  const { dispatch } = useAppContext()
  const router = useRouter()
  const { showToast } = useToast()
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

  const handleSignup = async () => {
    if (!inputValues.email || !inputValues.password) {
      showToast("error", "All fields are required!")
    }
    try {
      setIsLoading(true)
      await agent.Auth.register(inputValues)
      dispatch({
        type: "change_store",
        payload: {
          registrationEmail: inputValues.email,
        },
      })
      showToast("success", "Registration successful! Welcome aboard!")
      router.push("/")
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Registration failed. Please try again."
      showToast("error", errorMessage)
      console.log("Error:", error?.response?.data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DismissKeyboard>
      <Container paddingHorizontal={30}>
        <Text>Hello! Register to get started</Text>
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
            onSubmitEditing={handleSignup}
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
          <Link
            id="login"
            accessibilityLabel="login link"
            href="/"
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
            Login
          </Link>
        </View>
      </Container>
    </DismissKeyboard>
  )
}
