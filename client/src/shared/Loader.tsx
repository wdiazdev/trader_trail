import { COLORS } from "@/src/constants/Colors"
import { ActivityIndicator, View } from "react-native"
import useColorScheme from "../hooks/useColorScheme"

type Props = {
  size?: "small" | "large"
}
export default function Loader({ size = "small" }: Props) {
  const colorScheme = useColorScheme()
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={size} color={COLORS[colorScheme].primaryBtnText} />
    </View>
  )
}
