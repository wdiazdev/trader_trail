import React from "react"
import Container from "@/src/components/Container"
import Button from "@/src/components/Button"
import { useAppContext } from "@/src/store/storeContext"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Settings() {
  const { dispatch } = useAppContext()

  const handleLogOut = async () => {
    dispatch({
      type: "change_store",
      payload: {
        user: null,
      },
    })
    await AsyncStorage.removeItem("token")
  }

  return (
    <Container>
      <Button title="Logout" onPress={handleLogOut} />
    </Container>
  )
}
