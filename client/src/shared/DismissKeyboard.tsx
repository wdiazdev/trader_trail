import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native"

type Props = {
  children: React.ReactNode | React.ReactNode[]
}

export default function DismissKeyboard({ children }: Props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "transparent" }}
    >
      <TouchableWithoutFeedback
        style={{ backgroundColor: "transparent" }}
        onPress={() => Keyboard.dismiss()}
      >
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
