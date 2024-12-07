import { COLORS } from "@/src/constants/Colors"
import useColorScheme from "@/src/hooks/useColorScheme"
import { ActivityIndicator, View } from "react-native"

type Props = {
  size?: "small" | "large"
  color?: string
}
export default function Loader({ size = "small", color }: Props) {
  const colorScheme = useColorScheme()
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={size} color={color ?? COLORS[colorScheme].text} />
    </View>
  )
}
