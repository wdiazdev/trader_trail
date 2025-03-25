import { View } from "react-native"
import Text from "../shared/Text"
import { FlashList } from "@shopify/flash-list"
import { Trade } from "../types"

type Props = {
  trades: Trade[]
}

export default function TradesList({ trades }: Props) {
  const renderItem = ({ item }: { item: Trade }) => <Text style={{}}>{item.tradeId}</Text>

  return (
    <View>
      <FlashList data={trades} renderItem={renderItem} estimatedItemSize={200} />
    </View>
  )
}
