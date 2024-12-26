import { COLORS } from "@/src/constants/Colors"
import useColorScheme from "@/src/hooks/useColorScheme"
import { Pressable, TextInput as DefaultTextInput, TextInputProps } from "react-native"
import { ReactNode, useRef } from "react"
import { Ionicons } from "@expo/vector-icons"
import { shadowStyles } from "../helpers/shadowStyles"

type IoniconName = React.ComponentProps<typeof Ionicons>["name"]

interface CustomTextInputProps extends TextInputProps {
  leftIcon?: ReactNode
  leftIconName?: IoniconName
  rightIconVisible?: boolean
  clearValue?: () => void
  value: string
}

export default function TextInput({
  leftIconName,
  rightIconVisible,
  style,
  onChangeText,
  clearValue,
  value,
  ...props
}: CustomTextInputProps) {
  const colorScheme = useColorScheme()
  const inputRef = useRef<DefaultTextInput>(null)

  const handlePress = () => {
    inputRef.current?.focus()
  }

  return (
    <Pressable
      onPress={handlePress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderWidth: 1,
        borderColor: COLORS[colorScheme].inputPlaceholder,
        padding: 8,
        borderRadius: 10,
        backgroundColor: COLORS[colorScheme].secondaryBackground,
        ...shadowStyles(colorScheme),
      }}
    >
      {leftIconName && (
        <Ionicons
          name={leftIconName}
          color={COLORS[colorScheme].icon}
          size={16}
          style={{ marginHorizontal: 6 }}
        />
      )}
      <DefaultTextInput
        {...props}
        clearButtonMode="always"
        onChangeText={onChangeText}
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
          style={{ marginHorizontal: 6 }}
          onPress={clearValue}
        />
      )}
    </Pressable>
  )
}
