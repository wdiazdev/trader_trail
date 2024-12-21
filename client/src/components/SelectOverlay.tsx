import { useState } from "react"
import { Modal, TouchableOpacity } from "react-native"
import Text from "./Text"

export default function SelectOverlay() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  console.log("isOverlayVisible:", isOverlayVisible)

  const handleOpenOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible)
  }
  return (
    <TouchableOpacity onPress={handleOpenOverlay} style={{ width: "100%", height: 200 }}>
      <Text>Open Modal</Text>
      {isOverlayVisible && (
        <Modal
          animationType="fade"
          //   transparent
          visible={isOverlayVisible}
          onRequestClose={() => setIsOverlayVisible(false)}
        >
          <Text>Modal open</Text>
        </Modal>
      )}
    </TouchableOpacity>
  )
}
