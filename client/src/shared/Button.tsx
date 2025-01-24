import { COLORS } from "@/src/constants/Colors"
import React from "react"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import Loader from "./Loader"
import { shadowStyles } from "../helpers/shadowStyles"
import Text from "./Text"
import useColorScheme from "../hooks/useColorScheme"

interface ButtonProps extends TouchableOpacityProps {
  title: string
  loading?: boolean
  fullWidth?: boolean
}

export default function Button({
  title,
  loading,
  disabled,
  fullWidth,
  ...props
}: ButtonProps) {
  const colorScheme = useColorScheme()

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={{
        width: fullWidth ? "100%" : undefined,
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
          fontSize: 16,
          textAlign: "center",
          fontWeight: "bold",
          color: COLORS[colorScheme].primaryBtnText,
        }}
      >
        {loading ? <Loader /> : title}
      </Text>
    </TouchableOpacity>
  )
}
