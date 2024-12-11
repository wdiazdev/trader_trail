import React from "react"
import { Link } from "expo-router"
import Text from "../components/Text"
import Container from "../components/Container"

export default function NotFound() {
  return (
    <Container>
      <Link href="/">
        <Text>Oops! This screen doesn't exist. Go to home screen</Text>
      </Link>
    </Container>
  )
}
