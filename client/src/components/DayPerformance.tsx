import React from "react"
import { COLORS } from "@/src/constants/Colors"
import BorderedContainer from "@/src/shared/BorderedContainer"
import Text from "@/src/shared/Text"
import { BestWorstDay } from "@/src/types"
import { View } from "react-native"
import dayjs from "dayjs"
import useColorScheme from "../hooks/useColorScheme"

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
    <BorderedContainer flexDirection="row" justifyContent="space-between" padding={16}>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Best day</Text>
        {bestDayAmount > 0 ? (
          <>
            <Text
              style={{
                color: COLORS[colorScheme].altText,
                fontSize: 12,
                marginVertical: 4,
              }}
            >
              {bestDay?.date ? dayjs(bestDay.date).format("MM-DD-YYYY") : "-"}
            </Text>
            <Text
              style={{
                color: bestDayAmount > 0 ? COLORS[colorScheme].green : COLORS[colorScheme].red,
                marginTop: 2,
              }}
            >
              {isBalanceVisible ? `$${Math.abs(bestDayAmount).toFixed(2)}` : "*******"}
            </Text>
          </>
        ) : (
          <Text style={{ color: COLORS[colorScheme].altText }}>-</Text>
        )}
      </View>

      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Total trades</Text>
        <Text>{totalTrades}</Text>
      </View>

      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Worst day</Text>
        {worstDayAmount < 0 ? (
          <>
            <Text
              style={{
                color: COLORS[colorScheme].altText,
                fontSize: 12,
                marginVertical: 4,
              }}
            >
              {worstDay?.date ? dayjs(worstDay.date).format("MM-DD-YYYY") : "-"}
            </Text>
            <Text
              style={{
                color: worstDayAmount > 0 ? COLORS[colorScheme].green : COLORS[colorScheme].red,
                marginTop: 2,
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
