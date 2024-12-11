import { COLORS } from "@/src/constants/Colors"
import useColorScheme from "@/src/hooks/useColorScheme"
import { ReactNode } from "react"
import { View, ViewProps, ViewStyle } from "react-native"

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
  paddingVertical = 16,
  paddingHorizontal = 18,
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
