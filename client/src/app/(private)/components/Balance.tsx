import { COLORS } from "@/src/constants/Colors"
import useColorScheme from "@/src/hooks/useColorScheme"
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
      padding={14}
    >
      <Text>Balance</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: accountBalance > 0 ? COLORS[colorScheme].green : COLORS[colorScheme].red,
          }}
        >
          {isBalanceVisible ? `$${accountBalance.toFixed(2)}` : "*******"}
        </Text>
        <Pressable onPress={toggleBalanceVisible}>
          <Ionicons
            name="eye-outline"
            size={22}
            color={COLORS[colorScheme].text}
            style={{ marginLeft: 8 }}
          />
        </Pressable>
      </View>
    </BorderedContainer>
  )
}
