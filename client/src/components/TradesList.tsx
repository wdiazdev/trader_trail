import { View } from "react-native"
import Text from "../shared/Text"
import { FlashList } from "@shopify/flash-list"
import { Trade } from "../types"

type Props = {
  trades: Trade[]
}

export default function TradesList({ trades }: Props) {
  return (
    <View>
      <FlashList
        data={trades}
        renderItem={({ item }) => <Text>{item.tradeId}</Text>}
        estimatedItemSize={200}
      />
    </View>
  )
}
