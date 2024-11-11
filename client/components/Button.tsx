import { COLORS } from "@/constants/Colors"
import useColorScheme from "@/hooks/useColorScheme"
import React from "react"
import { TouchableOpacity, Text, TouchableOpacityProps, StyleSheet } from "react-native"

interface ButtonProps extends TouchableOpacityProps {
  title: string
}

export default function Button({ title, ...props }: ButtonProps) {
  const colorScheme = useColorScheme()
  return (
    <TouchableOpacity
      {...props}
      style={{
        backgroundColor: COLORS[colorScheme].primaryBtnBackground,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 14,
        borderRadius: 16,
      }}
    >
      <Text
        style={{
          fontFamily: "DMSans_400Regular",
          textAlign: "center",
          color: COLORS[colorScheme].primaryBtnText,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}
