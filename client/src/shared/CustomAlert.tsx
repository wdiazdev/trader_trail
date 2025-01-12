import React from "react"
import { View, Modal, TouchableOpacity } from "react-native"
import useColorScheme from "../hooks/useColorScheme"
import { COLORS } from "../constants/Colors"
import Text from "./Text"

type Props = {
  visible: boolean
  onCancel: () => void
  onConfirm: () => void
  title: string
  message: string
  leftBtnText?: string
  RightBtnText?: string
}

export default function CustomAlert({
  visible,
  onCancel,
  onConfirm,
  message,
  title,
  leftBtnText = "Cancel",
  RightBtnText = "Delete",
}: Props) {
  const colorScheme = useColorScheme()
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            width: 300,
            backgroundColor: COLORS[colorScheme].background,
            borderRadius: 10,
            padding: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: COLORS[colorScheme].text,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {message}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#DDDDDD",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
              onPress={onCancel}
            >
              <Text style={{ color: "#111111" }}>{leftBtnText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#FF5252",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
              }}
              onPress={onConfirm}
            >
              <Text style={{ color: "#FFFFFF" }}>{RightBtnText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
