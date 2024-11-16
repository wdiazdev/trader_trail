import { COLORS } from "@/constants/Colors"
import useColorScheme from "@/hooks/useColorScheme"
import React from "react"
import { TouchableOpacity, Text, TouchableOpacityProps, StyleSheet } from "react-native"
import Loader from "./Loader"

interface ButtonProps extends TouchableOpacityProps {
  title: string
  loading?: boolean
}

export default function Button({ title, loading, disabled, ...props }: ButtonProps) {
  const colorScheme = useColorScheme()

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={{
        backgroundColor: COLORS[colorScheme].primaryBtnBackground,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: COLORS[colorScheme].border,
        padding: 14,
        borderRadius: 16,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Text
        style={{
          fontFamily: "DMSans_400Regular",
          textAlign: "center",
          color: COLORS[colorScheme].primaryBtnText,
        }}
      >
        {loading ? <Loader /> : title}
      </Text>
    </TouchableOpacity>
  )
}
