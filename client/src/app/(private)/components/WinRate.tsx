import { COLORS } from "@/src/constants/Colors"
import useColorScheme from "@/src/hooks/useColorScheme"
import Text from "@/src/shared/Text"
import { View } from "react-native"

type Props = {
  avgWin: number
  avgLoss: number
}

export default function WinRate({ avgWin, avgLoss }: Props) {
  const colorScheme = useColorScheme()
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 4 }}>
        <Text>{avgWin}%</Text>
        <Text style={{ marginHorizontal: 8 }}>Win Rate</Text>
        <Text>{avgLoss}%</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 10,
          borderRadius: 10,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: COLORS[colorScheme].border,
        }}
      >
        <View
          style={{
            flex: avgWin,
            backgroundColor: COLORS[colorScheme].green,
          }}
        />
        <View
          style={{
            flex: avgLoss,
            backgroundColor: COLORS[colorScheme].red,
          }}
        />
      </View>
    </View>
  )
}
