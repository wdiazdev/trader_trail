import { COLORS } from "@/src/constants/Colors"
import useColorScheme from "@/src/hooks/useColorScheme"
import React from "react"
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native"
import Loader from "./Loader"
import { shadowStyles } from "../helpers/shadowStyles"

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
        borderWidth: 1,
        borderColor: "transparent",
        padding: 14,
        borderRadius: 10,
        opacity: disabled ? 0.5 : 1,
        ...shadowStyles(colorScheme),
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
