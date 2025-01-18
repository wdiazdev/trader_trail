import { COLORS } from "@/src/constants/Colors"
import { Text as DefaultText, TextProps } from "react-native"
import useColorScheme from "../hooks/useColorScheme"

interface CustomTextProps extends TextProps {}

export default function Text({ style, ...props }: CustomTextProps) {
  const colorScheme = useColorScheme()
  return (
    <DefaultText
      {...props}
      allowFontScaling={false}
      style={[
        {
          fontSize: 16,
          fontFamily: "DMSans_400Regular",
          color: COLORS[colorScheme].text,
        },
        style,
      ]}
    />
  )
}
