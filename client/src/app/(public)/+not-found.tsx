import React from "react"
import { Link, Stack } from "expo-router"
import Container from "@/src/shared/Container"
import Text from "@/src/shared/Text"
import useColorScheme from "@/src/hooks/useColorScheme"
import { COLORS } from "@/src/constants/Colors"

export default function NotFound() {
  const colorScheme = useColorScheme()
  return (
    <>
      <Stack.Screen
        options={{
          title: "Oops! This screen doesn't exist.",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: "bold",
            color: COLORS[colorScheme].text,
          },
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS[colorScheme].background,
          },
          headerLeft: () => <></>,
        }}
      />
      <Container>
        <Link href="/">
          <Text style={{ color: COLORS[colorScheme].altText }}>
            Go to home screen
          </Text>
        </Link>
      </Container>
    </>
  )
}
