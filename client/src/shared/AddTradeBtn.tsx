import { Pressable, View } from "react-native"
import Text from "./Text"
import { COLORS } from "../constants/Colors"
import useColorScheme from "../hooks/useColorScheme"

type Props = {
  leftBtnText?: string
  onCancel: () => void
  RightBtnText?: string
  onConfirm: () => void
}

export default function AddTradeBtn({
  leftBtnText = "cancel",
  RightBtnText,
  onCancel,
  onConfirm,
}: Props) {
  const colorScheme = useColorScheme()
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: 26,
      }}
    >
      <Pressable
        onPress={onCancel}
        style={{
          flex: 1,
          backgroundColor: "#DDDDDD",
          paddingVertical: 14,
          paddingHorizontal: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{ textAlign: "center", fontWeight: "bold", color: "#111111" }}
        >
          {leftBtnText}
        </Text>
      </Pressable>
      <Pressable
        onPress={onConfirm}
        style={{
          flex: 1,
          backgroundColor: COLORS[colorScheme].primaryBtnBackground,
          paddingVertical: 14,
          paddingHorizontal: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{ textAlign: "center", fontWeight: "bold", color: "#111111" }}
        >
          {RightBtnText}
        </Text>
      </Pressable>
    </View>
  )
}
