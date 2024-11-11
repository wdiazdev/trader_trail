import { COLORS } from "@/constants/Colors"
import useColorScheme from "@/hooks/useColorScheme"
import { Text as DefaultText, TextProps } from "react-native"

interface CustomTextProps extends TextProps {}

export default function Text({ style, ...props }: CustomTextProps) {
  const colorScheme = useColorScheme()
  return (
    <DefaultText
      {...props}
      allowFontScaling={false}
      style={[
        {
          fontFamily: "DMSans_400Regular",
          color: COLORS[colorScheme].text,
        },
        style,
      ]}
    />
  )
}
