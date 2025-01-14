import { StyleSheet, View, ViewProps, ViewStyle } from "react-native"
import { COLORS } from "../constants/Colors"
import { shadowStyles } from "../helpers/shadowStyles"
import useColorScheme from "../hooks/useColorScheme"

type BorderedContainerProps = ViewProps & {
  children?: React.ReactNode
  padding?: number
  flexDirection?: ViewStyle["flexDirection"]
  justifyContent?: ViewStyle["justifyContent"]
  alignItems?: ViewStyle["alignItems"]
  fullWidth?: boolean
  marginVertical?: ViewStyle["marginVertical"]
}

export default function BorderedContainer({
  children,
  padding = 12,
  flexDirection,
  justifyContent,
  alignItems,
  fullWidth,
  marginVertical,
  ...rest
}: BorderedContainerProps) {
  const colorScheme = useColorScheme()
  return (
    <View
      {...rest}
      style={{
        width: fullWidth ? "100%" : undefined,
        flexDirection,
        justifyContent,
        alignItems,
        padding,
        marginVertical,
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
