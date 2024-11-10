import { COLORS } from "@/constants/Colors"
import useColorScheme from "@/hooks/useColorScheme"
import { ReactNode } from "react"
import { View, ViewStyle } from "react-native"

interface Props {
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
  paddingVertical = 16,
  paddingHorizontal = 18,
  justifyContent = "center",
  alignItems = "center",
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
    >
      {children}
    </View>
  )
}
