import { COLORS } from "@/src/constants/Colors"
import Text from "@/src/shared/Text"
import { View } from "react-native"
import useColorScheme from "../hooks/useColorScheme"

type Props = {
  avgWin: number
  avgLoss: number
}

export default function WinRate({ avgWin, avgLoss }: Props) {
  const colorScheme = useColorScheme()
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            color:
              avgWin === 0
                ? COLORS[colorScheme].text
                : COLORS[colorScheme].green,
          }}
        >
          {avgWin}%
        </Text>
        <Text style={{ fontWeight: "bold", marginHorizontal: 8 }}>
          Win Rate
        </Text>
        <Text
          style={{
            color:
              avgLoss === 0
                ? COLORS[colorScheme].text
                : COLORS[colorScheme].red,
          }}
        >
          {avgLoss}%
        </Text>
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
