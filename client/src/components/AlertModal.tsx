import React from "react"
import { View, Modal, TouchableOpacity } from "react-native"
import useColorScheme from "../hooks/useColorScheme"
import { COLORS } from "../constants/Colors"
import Text from "./Text"

type Props = {
  visible: boolean
  onCancel: () => void
  onConfirm: () => void
}

export default function CustomAlert({ visible, onCancel, onConfirm }: Props) {
  const colorScheme = useColorScheme()
  return (
    <Modal transparent={true} visible={visible} animationType="slide" onRequestClose={onCancel}>
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
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" }}>
            Delete Account
          </Text>
          <Text style={{ color: COLORS[colorScheme].text, textAlign: "center", marginBottom: 20 }}>
            Are you sure you want to delete your account?
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#DDDDDD",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
              onPress={onCancel}
            >
              <Text style={{ color: "#111111" }}>Cancel</Text>
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
              <Text style={{ color: "#FFFFFF" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
