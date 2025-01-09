import React from "react"
import { CartesianChart, Area } from "victory-native"
import Text from "../shared/Text"
import { Trade } from "../types"

type Props = {
  trades: Trade[]
}

export default function TradesAreaChart({ trades }: Props) {
  const DATA = Array.from({ length: 31 }, (_, i) => ({
    day: i,
    highTmp: 40 + 30 * Math.random(),
  }))
  return (
    <>
      <Text>Chart</Text>
      <CartesianChart data={DATA} xKey="day" yKeys={["highTmp"]}>
        {({ points, chartBounds }) => (
          <Area
            points={points.highTmp}
            y0={chartBounds.bottom}
            color="red"
            animate={{ type: "timing", duration: 300 }}
            connectMissingData={true}
          />
        )}
      </CartesianChart>
    </>
  )
}
