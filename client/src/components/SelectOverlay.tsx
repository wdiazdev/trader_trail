import { useState } from "react"
import { Modal, Pressable, StyleSheet, TouchableOpacity, View } from "react-native"
import Text from "./Text"
import useColorScheme from "../hooks/useColorScheme"
import { COLORS } from "../constants/Colors"
import { SelectOverlayOption, AccountsData } from "../types"
import { Ionicons } from "@expo/vector-icons"
import { shadowStyles } from "../helpers/shadowStyles"

type Props = {
  options: SelectOverlayOption[] | undefined
  onSelectionChange: (selected: SelectOverlayOption | undefined) => void
  selectedAccount: AccountsData | undefined
}

export default function SelectOverlay({ options, onSelectionChange, selectedAccount }: Props) {
  const colorScheme = useColorScheme()
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  const toggleOverlay = () => {
    setIsOverlayVisible((prev) => !prev)
  }

  const handleOptionSelect = (selected: SelectOverlayOption) => {
    onSelectionChange(selected)
    setIsOverlayVisible(false)
  }

  return (
    <TouchableOpacity
      onPress={toggleOverlay}
      style={{
        width: "100%",
        padding: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        borderColor: COLORS[colorScheme].altText,
        backgroundColor: COLORS[colorScheme].background,
        ...shadowStyles(colorScheme),
      }}
      disabled={!options?.length}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          justifyContent: "space-between",
        }}
      >
        <Text>{selectedAccount?.accountName}</Text>
        <Ionicons
          name={isOverlayVisible ? "chevron-up" : "chevron-down"}
          size={22}
          color={COLORS[colorScheme].text}
        />
      </View>
      {isOverlayVisible && (
        <Modal
          animationType="fade"
          transparent
          visible={isOverlayVisible}
          onRequestClose={toggleOverlay}
        >
          <Pressable
            onPress={toggleOverlay}
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              paddingHorizontal: 18,
            }}
          >
            <View
              style={{
                marginTop: 160,
                backgroundColor: COLORS[colorScheme].background,
                padding: 20,
                borderRadius: 10,
              }}
            >
              {options &&
                options.map((opt, index) => (
                  <Pressable
                    key={opt.description}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingVertical: 12,
                      borderBottomWidth: index < options.length - 1 ? StyleSheet.hairlineWidth : 0,
                      borderColor: COLORS[colorScheme].inputPlaceholder,
                      ...(index === 0 && { paddingTop: 0 }),
                      ...(index === options.length - 1 && { paddingBottom: 0 }),
                    }}
                    onPress={() => handleOptionSelect(opt)}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color:
                          opt.description === selectedAccount?.accountId
                            ? COLORS[colorScheme].icon
                            : COLORS[colorScheme].text,
                      }}
                    >
                      {opt.label}
                    </Text>
                    {opt.description === selectedAccount?.accountId && (
                      <Ionicons name="checkmark" size={22} color={COLORS[colorScheme].icon} />
                    )}
                  </Pressable>
                ))}
            </View>
          </Pressable>
        </Modal>
      )}
    </TouchableOpacity>
  )
}
