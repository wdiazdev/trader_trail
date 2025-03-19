import { Dimensions, Modal, TextInput, View } from "react-native"
import Button from "../shared/Button"
import AddTradeBtn from "./AddTradeBtn"
import Text from "../shared/Text"
import { useState } from "react"
import { COLORS } from "../constants/Colors"
import useColorScheme from "../hooks/useColorScheme"

const { height } = Dimensions.get("window")

type Props = {
  toggleAddNewTrade: () => void
  isNewTradeModalVisible: boolean
}

export default function AddTradeModal({ toggleAddNewTrade, isNewTradeModalVisible }: Props) {
  const colorScheme = useColorScheme()

  const [selectedButton, setSelectedButton] = useState<"winner" | "loser">("winner")
  const [decimalShift, setDecimalShift] = useState("")

  const handleTextChange = (text: string) => {
    let amount = text.replace(/[^0-9]/g, "").replace(/^0+/, "")

    if (amount.length > 0) {
      const length = amount.length
      let formattedAmount

      if (length === 1) {
        formattedAmount = `$0.0${amount}`
      } else if (length === 2) {
        formattedAmount = `$0.${amount}`
      } else {
        formattedAmount = `$${amount.slice(0, length - 2)}.${amount.slice(length - 2)}`
      }
      setDecimalShift(formattedAmount)
    } else {
      setDecimalShift("")
    }
  }

  const handleButtonChange = (selected: "winner" | "loser") => {
    setSelectedButton(selected)
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isNewTradeModalVisible}
      onRequestClose={toggleAddNewTrade}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          paddingHorizontal: 14,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            backgroundColor: COLORS[colorScheme].secondaryBackground,
            padding: 14,
            borderRadius: 10,
            marginTop: height * 0.2,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              marginTop: 6,
              marginBottom: 20,
            }}
          >
            Add New Trade
          </Text>

          <AddTradeBtn handleButtonChange={handleButtonChange} />

          <TextInput
            keyboardType="number-pad"
            placeholder="$0.00"
            placeholderTextColor={COLORS[colorScheme].inputPlaceholder}
            value={decimalShift}
            onChangeText={handleTextChange}
            style={{
              marginVertical: 20,
              borderRadius: 10,
              backgroundColor: COLORS[colorScheme].inputBackground,
              fontSize: 44,
              textAlign: "center",
              fontWeight: "bold",
              color:
                selectedButton === "winner" ? COLORS[colorScheme].green : COLORS[colorScheme].red,
              borderWidth: 1,
              borderColor: COLORS[colorScheme].inputPlaceholder,
            }}
          />
          <Button
            fullWidth
            id="addTradeModalBtn"
            accessibilityLabel="Add trade Modal button"
            title={"Add"}
            onPress={toggleAddNewTrade}
          />
        </View>
      </View>
    </Modal>
  )
}
