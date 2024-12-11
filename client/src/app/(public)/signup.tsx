import Button from "@/src/components/Button"
import Container from "@/src/components/Container"
import Input from "@/src/components/Input"
import Text from "@/src/components/Text"
import { useState } from "react"
import { View } from "react-native"
import { useToast } from "../../context/toastContext"
import { useRouter } from "expo-router"
import agent from "../../api/agent"
import { useAppContext } from "../../store/storeContext"

interface AuthTypes {
  email: string
  password: string
}

export default function Signup() {
  const { dispatch } = useAppContext()
  const router = useRouter()
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

  const handleSignup = async () => {
    if (!inputValues.email || !inputValues.password) {
      showToast("error", "All fields are required!")
    }
    try {
      setIsLoading(true)
      await agent.Account.register(inputValues)
      dispatch({
        type: "change_store",
        payload: {
          registrationEmail: inputValues.email,
        },
      })
      showToast("success", "Registration successful! Welcome aboard!")
      router.push("/")
    } catch (error: any) {
      showToast("error", "Registration failed. Please try again.")
      console.log("Registration failed:", error.message)
    } finally {
      setIsLoading(false)
    }
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
          secureTextEntry={true}
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
    </Container>
  )
}
