import { COLORS } from "@/src/constants/Colors"
import { ReactNode } from "react"
import { View, ViewProps, ViewStyle } from "react-native"
import useColorScheme from "../hooks/useColorScheme"

interface Props extends ViewProps {
  children: ReactNode
  flex?: number
  paddingVertical?: number
  paddingHorizontal?: number
  justifyContent?: ViewStyle["justifyContent"]
  alignItems?: ViewStyle["alignItems"]
}

export default function Container({
  children,
  flex = 1,
  paddingVertical = 14,
  paddingHorizontal = 14,
  justifyContent = "center",
  alignItems = "center",

  ...props
}: Props) {
  const colorScheme = useColorScheme()
  return (
    <View
      style={{
        width: "100%",
        flex,
        paddingVertical,
        paddingHorizontal,
        justifyContent,
        alignItems,
        backgroundColor: COLORS[colorScheme].background,
      }}
      {...props}
    >
      {children}
    </View>
  )
}
