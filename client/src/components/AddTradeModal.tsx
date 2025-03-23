import {
  Dimensions,
  Keyboard,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import Button from "../shared/Button"
import Text from "../shared/Text"
import { useState } from "react"
import { COLORS } from "../constants/Colors"
import useColorScheme from "../hooks/useColorScheme"
import useGetTrades from "../services/useGetTrades"
import { useToast } from "../context/toastContext"
import AddTradeBtnGroup from "./AddTradeBtnGroup"
import { FontAwesome6 } from "@expo/vector-icons"

const { height } = Dimensions.get("window")

type Props = {
  accountId: string
}

export default function AddTradeModal({ accountId }: Props) {
  const colorScheme = useColorScheme()
  const { showToast } = useToast()

  const [isNewTradeModalVisible, setIsNewTradeModalVisible] = useState(false)
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [selectedButton, setSelectedButton] = useState<"winner" | "loser">("winner")
  const [decimalShift, setDecimalShift] = useState("")

  const { createTradeMutation } = useGetTrades(accountId)

  const toggleAddNewTradeModal = () => {
    setIsNewTradeModalVisible((prev) => !prev)
  }

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

  const handleAddTrade = async () => {
    if (!accountId) return
    try {
      setIsLoginLoading(true)
      let numericAmount = parseFloat(decimalShift.replace(/[^0-9.]/g, "")) || 0

      if (selectedButton === "loser") {
        numericAmount = numericAmount * -1
      }

      if (numericAmount === 0) return

      await createTradeMutation.mutateAsync({ accountId: accountId, amount: numericAmount })
      showToast("success", "Trade added successfully")
    } catch (error) {
      showToast("error", "Failed to add trade")
      console.log("error:", error)
    } finally {
      setDecimalShift("")
      setIsLoginLoading(false)
      toggleAddNewTradeModal()
    }
  }

  return (
    <>
      <TouchableOpacity
        id="addTrade"
        accessibilityLabel="Add trade button"
        onPress={toggleAddNewTradeModal}
      >
        <FontAwesome6 name={"circle-plus"} size={44} color={COLORS[colorScheme].blue} />
      </TouchableOpacity>

      {isNewTradeModalVisible ? (
        <Modal
          animationType="fade"
          transparent
          visible={isNewTradeModalVisible}
          onRequestClose={toggleAddNewTradeModal}
        >
          <TouchableWithoutFeedback onPress={() => (Keyboard.dismiss(), toggleAddNewTradeModal())}>
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                paddingHorizontal: 14,
              }}
            >
              <View
                style={{
                  marginTop: height * 0.2,
                  backgroundColor: COLORS[colorScheme].secondaryBackground,
                  padding: 20,
                  borderRadius: 10,
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

                <AddTradeBtnGroup handleButtonChange={handleButtonChange} />

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
                      selectedButton === "winner"
                        ? COLORS[colorScheme].green
                        : COLORS[colorScheme].red,
                    borderWidth: 1,
                    borderColor: COLORS[colorScheme].inputPlaceholder,
                  }}
                />
                <Button
                  fullWidth
                  id="addTradeModalBtn"
                  accessibilityLabel="Add trade Modal button"
                  title={"Add"}
                  onPress={handleAddTrade}
                  loading={isLoginLoading}
                  disabled={!decimalShift || isLoginLoading}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : null}
    </>
  )
}
