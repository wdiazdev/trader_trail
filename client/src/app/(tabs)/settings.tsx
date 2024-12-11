import React from "react"
import Container from "@/src/components/Container"
import Button from "@/src/components/Button"
import { useAppContext } from "@/src/store/storeContext"

export default function Settings() {
  const { dispatch } = useAppContext()

  const handleLogOut = () => {
    dispatch({
      type: "change_store",
      payload: {
        user: null,
      },
    })
  }

  return (
    <Container>
      <Button title="Logout" onPress={handleLogOut} />
    </Container>
  )
}
