import React from "react"
import { COLORS } from "@/src/constants/Colors"
import useColorScheme from "@/src/hooks/useColorScheme"
import BorderedContainer from "@/src/shared/BorderedContainer"
import Text from "@/src/shared/Text"
import { BestWorstDay } from "@/src/types"
import { View } from "react-native"
import dayjs from "dayjs"

type Props = {
  isBalanceVisible: boolean
  totalTrades: number
  bestWorstDay: BestWorstDay
}

export default function DayPerformance({ isBalanceVisible, totalTrades, bestWorstDay }: Props) {
  const colorScheme = useColorScheme()

  const { bestDay, worstDay } = bestWorstDay

  const bestDayAmount = bestDay?.amount ?? 0
  const worstDayAmount = worstDay?.amount ?? 0

  return (
    <BorderedContainer flexDirection="row" justifyContent="space-between" padding={14}>
      <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Text>Best day</Text>
        {bestDayAmount > 0 ? (
          <>
            <Text style={{ color: COLORS[colorScheme].altText, fontSize: 10, marginVertical: 2 }}>
              {bestDay?.date ? dayjs(bestDay.date).format("MM-DD-YYYY") : "-"}
            </Text>
            <Text
              style={{
                color: bestDayAmount > 0 ? COLORS[colorScheme].green : COLORS[colorScheme].red,
              }}
            >
              {isBalanceVisible ? `$${Math.abs(bestDayAmount).toFixed(2)}` : "*******"}
            </Text>
          </>
        ) : (
          <Text style={{ color: COLORS[colorScheme].altText }}>-</Text>
        )}
      </View>

      <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Text>Total trades</Text>
        <Text>{totalTrades}</Text>
      </View>

      <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Text>Worst day</Text>
        {worstDayAmount < 0 ? (
          <>
            <Text style={{ color: COLORS[colorScheme].altText, fontSize: 10, marginVertical: 2 }}>
              {worstDay?.date ? dayjs(worstDay.date).format("MM-DD-YYYY") : "-"}
            </Text>
            <Text
              style={{
                color: worstDayAmount > 0 ? COLORS[colorScheme].green : COLORS[colorScheme].red,
              }}
            >
              {isBalanceVisible ? `-$${Math.abs(worstDayAmount).toFixed(2)}` : "*******"}
            </Text>
          </>
        ) : (
          <Text style={{ color: COLORS[colorScheme].altText }}>-</Text>
        )}
      </View>
    </BorderedContainer>
  )
}