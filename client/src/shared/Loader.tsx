import { COLORS } from "@/src/constants/Colors"
import { ActivityIndicator, View } from "react-native"
import useColorScheme from "../hooks/useColorScheme"

type Props = {
  size?: "small" | "large"
  btnSpinner?: boolean
}
export default function Loader({ size = "small", btnSpinner }: Props) {
  const colorScheme = useColorScheme()
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator
        size={size}
        color={btnSpinner ? COLORS[colorScheme].primaryBtnText : COLORS[colorScheme].blue}
      />
    </View>
  )
}
