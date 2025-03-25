import { COLORS } from "@/src/constants/Colors"
import useColorScheme from "../hooks/useColorScheme"
import BorderedContainer from "@/src/shared/BorderedContainer"
import Text from "@/src/shared/Text"
import { Ionicons } from "@expo/vector-icons"
import { Pressable, View } from "react-native"

type Props = {
  accountBalance: number
  isBalanceVisible: boolean
  toggleBalanceVisible: () => void
}

export default function Balance({ accountBalance, isBalanceVisible, toggleBalanceVisible }: Props) {
  const colorScheme = useColorScheme()
  return (
    <BorderedContainer
      fullWidth
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      padding={16}
      marginVertical={12}
    >
      <Text style={{ fontWeight: "bold" }}>Total P&L</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color:
              accountBalance === 0
                ? COLORS[colorScheme].text
                : accountBalance > 0
                ? COLORS[colorScheme].green
                : COLORS[colorScheme].red,
          }}
        >
          {isBalanceVisible
            ? accountBalance >= 0
              ? `$${Math.abs(accountBalance).toFixed(2)}`
              : `-$${Math.abs(accountBalance).toFixed(2)}`
            : "*******"}
        </Text>
        <Pressable onPress={toggleBalanceVisible}>
          <Ionicons
            name="eye-outline"
            size={18}
            color={COLORS[colorScheme].text}
            style={{ marginLeft: 8 }}
          />
        </Pressable>
      </View>
    </BorderedContainer>
  )
}
