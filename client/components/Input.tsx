import { COLORS } from "@/constants/Colors"
import useColorScheme from "@/hooks/useColorScheme"
import { Pressable, TextInput } from "react-native"
import { ReactNode, useRef } from "react"

interface Props {
  placeholder: string
  IconComponent?: ReactNode
  autoFocus?: boolean
}

export default function Input({ autoFocus, placeholder, IconComponent }: Props) {
  const colorScheme = useColorScheme()
  const inputRef = useRef<TextInput>(null)

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
        padding: 8,
        borderRadius: 16,
        borderColor: COLORS[colorScheme].border,
      }}
    >
      {IconComponent}
      <TextInput
        ref={inputRef}
        autoFocus={autoFocus}
        placeholder={placeholder}
        placeholderTextColor={COLORS[colorScheme].border}
        style={{
          flex: 1,
          color: COLORS[colorScheme].text,
        }}
      />
    </Pressable>
  )
}
