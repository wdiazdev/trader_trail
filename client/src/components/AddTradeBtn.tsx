import { Pressable, View } from "react-native"
import Text from "../shared/Text"
import { COLORS } from "../constants/Colors"
import useColorScheme from "../hooks/useColorScheme"
import { useState } from "react"

type Props = {
  handleButtonChange: (selected: "winner" | "loser") => void
}

export default function AddTradeBtn({ handleButtonChange }: Props) {
  const colorScheme = useColorScheme()

  const [selectedButton, setSelectedButton] = useState<"winner" | "loser">(
    "winner"
  )

  const handleButtonPress = (buttonType: "loser" | "winner") => {
    setSelectedButton(buttonType)
    handleButtonChange(buttonType)
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Pressable
        onPress={() => handleButtonPress("loser")}
        style={{
          flex: 1,
          backgroundColor: COLORS[colorScheme].red,
          opacity: selectedButton === "loser" ? 1 : 0.5,
          padding: 14,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            fontWeight: "bold",
            color: "#111111",
          }}
        >
          Loser
        </Text>
      </Pressable>
      <Pressable
        onPress={() => handleButtonPress("winner")}
        style={{
          flex: 1,
          backgroundColor: COLORS[colorScheme].green,
          opacity: selectedButton === "winner" ? 1 : 0.5,
          padding: 14,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            fontWeight: "bold",
            color: "#111111",
          }}
        >
          Winner
        </Text>
      </Pressable>
    </View>
  )
}
