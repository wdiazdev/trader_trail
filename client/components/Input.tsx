import { COLORS } from "@/constants/Colors"
import useColorScheme from "@/hooks/useColorScheme"
import { Pressable, TextInput as DefaultTextInput, TextInputProps, StyleSheet } from "react-native"
import { ReactNode, useRef, useState } from "react"
import { Ionicons } from "@expo/vector-icons"

type IoniconName = React.ComponentProps<typeof Ionicons>["name"]

interface CustomTextInputProps extends TextInputProps {
  leftIcon?: ReactNode
  leftIconName?: IoniconName
  rightIconVisible?: boolean
}

export default function TextInput({
  leftIconName,
  rightIconVisible,
  style,
  onChangeText,
  ...props
}: CustomTextInputProps) {
  const colorScheme = useColorScheme()
  const inputRef = useRef<DefaultTextInput>(null)
  const [value, setValue] = useState("")

  const handlePress = () => {
    inputRef.current?.focus()
  }

  const handleChangeText = (value: string) => {
    setValue(value)
    if (onChangeText) {
      onChangeText(value)
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderWidth: StyleSheet.hairlineWidth,
        padding: 8,
        borderRadius: 16,
        borderColor: COLORS[colorScheme].border,
        backgroundColor: COLORS[colorScheme].inputBackground,
      }}
    >
      {leftIconName && (
        <Ionicons
          name={leftIconName}
          color={COLORS[colorScheme].icon}
          size={16}
          style={{ marginHorizontal: 6, marginTop: 1 }}
        />
      )}
      <DefaultTextInput
        {...props}
        onChangeText={handleChangeText}
        value={value}
        ref={inputRef}
        placeholderTextColor={COLORS[colorScheme].inputPlaceholder}
        style={{
          flex: 1,
          color: COLORS[colorScheme].inputText,
          fontFamily: "DMSans_400Regular",
        }}
      />
      {rightIconVisible && value.length > 0 && (
        <Ionicons
          name={"close-circle"}
          color={COLORS[colorScheme].icon}
          size={16}
          style={{ marginHorizontal: 6, marginTop: 1 }}
          onPress={() => setValue("")}
        />
      )}
    </Pressable>
  )
}
