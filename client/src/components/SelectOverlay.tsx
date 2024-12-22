import { useState } from "react"
import { Modal, Pressable, StyleSheet, TouchableOpacity, View } from "react-native"
import Text from "./Text"
import useColorScheme from "../hooks/useColorScheme"
import { COLORS } from "../constants/Colors"
import { SelectOverlayOption } from "../types"
import { Ionicons } from "@expo/vector-icons"

type Props = {
  options: SelectOverlayOption[] | undefined
  onSelectionChange: (selected: SelectOverlayOption | undefined) => void
}

export default function SelectOverlay({ options, onSelectionChange }: Props) {
  const colorScheme = useColorScheme()
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [selectedOption, setSelectedOption] = useState<SelectOverlayOption | undefined>(
    options?.[0],
  )

  const toggleOverlay = () => {
    setIsOverlayVisible((prev) => !prev)
  }

  const handleOptionSelect = (selected: SelectOverlayOption) => {
    setSelectedOption(selected)
    onSelectionChange(selected)
    setIsOverlayVisible(false)
  }

  return (
    <TouchableOpacity
      onPress={toggleOverlay}
      style={{ width: "100%", height: 200 }}
      disabled={!options?.length}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <Text>{selectedOption?.label}</Text>
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
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              paddingHorizontal: 26,
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
                          opt.description === selectedOption?.description
                            ? COLORS[colorScheme].icon
                            : COLORS[colorScheme].text,
                      }}
                    >
                      {opt.label}
                    </Text>
                    {opt.description === selectedOption?.description && (
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
