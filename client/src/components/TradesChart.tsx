import React from "react"
import { CartesianChart, Line } from "victory-native"
import { Trade } from "../types"
import { COLORS } from "../constants/Colors"
import { View } from "react-native"
import useColorScheme from "../hooks/useColorScheme"

type Props = {
  trades: Trade[]
  accountBalance: number
}

export default function TradesChart({ trades, accountBalance }: Props) {
  const colorScheme = useColorScheme()

  const transformedData = trades.map((trade) => ({
    date: new Date(trade.createdAt).toLocaleDateString("en-US"),
    amount: trade.amount,
  }))

  return (
    <View style={{ height: 200, width: "100%", marginTop: 6 }}>
      <CartesianChart
        data={transformedData}
        xKey="date"
        yKeys={["amount"]}
        frame={{ lineColor: COLORS[colorScheme].border, lineWidth: 1 }}
      >
        {({ points }) => (
          <Line
            points={points.amount}
            color={
              accountBalance > 0
                ? COLORS[colorScheme].green
                : COLORS[colorScheme].red
            }
            strokeWidth={2}
            animate={{ type: "timing", duration: 500 }}
            connectMissingData={true}
            curveType="bumpX"
          />
        )}
      </CartesianChart>
    </View>
  )
}
