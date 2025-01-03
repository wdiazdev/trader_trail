import { StyleSheet, View, ViewProps, ViewStyle } from "react-native"
import { COLORS } from "../constants/Colors"
import useColorScheme from "../hooks/useColorScheme"
import { shadowStyles } from "../helpers/shadowStyles"

type BorderedContainerProps = ViewProps & {
  children?: React.ReactNode
  padding?: number
  flexDirection?: ViewStyle["flexDirection"]
  justifyContent?: ViewStyle["justifyContent"]
  alignItems?: ViewStyle["alignItems"]
  fullWidth?: boolean
}

export default function BorderedContainer({
  children,
  padding = 12,
  flexDirection,
  justifyContent,
  alignItems,
  fullWidth,
  ...rest
}: BorderedContainerProps) {
  const colorScheme = useColorScheme()
  return (
    <View
      {...rest}
      style={{
        width: fullWidth ? "100%" : undefined,
        flexDirection: flexDirection,
        justifyContent: justifyContent,
        alignItems: alignItems,
        padding: padding,
        borderRadius: 10,
        backgroundColor: COLORS[colorScheme].background,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: COLORS[colorScheme].border,
        ...shadowStyles(colorScheme),
      }}
    >
      {children}
    </View>
  )
}
