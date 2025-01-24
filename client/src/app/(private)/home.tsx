import React, { useEffect, useRef, useState } from "react"
import Container from "@/src/shared/Container"
import Text from "@/src/shared/Text"
import { useAppContext } from "@/src/store/storeContext"
import { AccountsData, SelectOverlayOption } from "@/src/types"
import Loader from "@/src/shared/Loader"
import SelectOverlay from "@/src/shared/SelectOverlay"
import Button from "@/src/shared/Button"
import { COLORS } from "@/src/constants/Colors"
import useColorScheme from "@/src/hooks/useColorScheme"
import { View, ScrollView, Dimensions, TextInput } from "react-native"
import useGetAccounts from "@/src/services/useGetAccounts"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Balance from "../../components/Balance"
import DayPerformance from "../../components/DayPerformance"
import WinRate from "../../components/WinRate"
import TradesChart from "@/src/components/TradesChart"
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet"
import AddTradeBtn from "@/src/components/AddTradeBtn"

const { height } = Dimensions.get("window")

export default function Home() {
  const { state } = useAppContext()
  const colorScheme = useColorScheme()

  const addTradeSheetRef = useRef<BottomSheetMethods>(null)

  const [selectedAccount, setSelectedAccount] = useState<
    AccountsData | undefined
  >(undefined)
  const [isBalanceVisible, setIsBalanceVisible] = useState(true)
  const [decimalShift, setDecimalShift] = useState("")
  const [selectedButton, setSelectedButton] = useState<"winner" | "loser">(
    "winner"
  )

  const { accountsQuery, tradesQuery } = useGetAccounts(
    state.user?.access_token,
    state.user?.userId || "",
    selectedAccount?.accountId || ""
  )

  const {
    data: accountsData,
    isLoading: isAccountsQueryLoading,
    fetchStatus: accountsQueryFetchStatus,
  } = accountsQuery

  const {
    data: tradesData,
    isLoading: isTradesQueryLoading,
    fetchStatus: tradesQueryFetchStatus,
  } = tradesQuery

  useEffect(() => {
    if (accountsData?.data && accountsData.data.length > 0) {
      setSelectedAccount(accountsData.data[0])
    }
  }, [accountsData?.data])

  if (isAccountsQueryLoading || accountsQueryFetchStatus === "fetching") {
    return (
      <Container>
        <Loader size="large" />
      </Container>
    )
  }

  if (!accountsData?.data?.length) {
    return (
      <Container>
        <View style={{ width: "100%" }}>
          <Text
            style={{
              textAlign: "center",
              color: COLORS[colorScheme].altText,
              marginBottom: 12,
            }}
          >
            It looks like you don’t have any accounts logged yet. Start by
            creating a trading account to track your trades and improve your
            performance!
          </Text>
          <Button
            id="logAccount"
            accessibilityLabel="Log a trading account"
            title="Create a Trading Account"
          />
        </View>
      </Container>
    )
  }

  const selectOptions = accountsData.data.map((account) => {
    return {
      label: account.accountName,
      description: account.accountId,
    }
  })

  const handleSelectionChange = (selected: SelectOverlayOption | undefined) => {
    if (selected && accountsData?.data) {
      const account = accountsData.data.find(
        (account) => account.accountId === selected.description
      )
      if (account) setSelectedAccount(account)
    }
  }

  const toggleBalanceVisible = async () => {
    setIsBalanceVisible((prev) => {
      const newValue = !prev
      AsyncStorage.setItem("isBalanceVisible", JSON.stringify(newValue))
      return newValue
    })
  }

  const handleTextChange = (text: string) => {
    let amount = text.replace(/[^0-9]/g, "").replace(/^0+/, "")

    if (amount.length > 0) {
      const length = amount.length
      let formattedAmount

      if (length === 1) {
        formattedAmount = `$0.0${amount}`
      } else if (length === 2) {
        formattedAmount = `$0.${amount}`
      } else {
        formattedAmount = `$${amount.slice(0, length - 2)}.${amount.slice(
          length - 2
        )}`
      }
      setDecimalShift(formattedAmount)
    } else {
      setDecimalShift("")
    }
  }

  const handleButtonChange = (selected: "winner" | "loser") => {
    setSelectedButton(selected)
  }

  const {
    balance: accountBalance,
    bestWorstDay,
    avgWin,
    avgLoss,
    totalTrades,
    trades,
  } = tradesData?.data ?? {}

  return (
    <>
      <Container>
        {selectOptions?.length ? (
          <SelectOverlay
            options={selectOptions}
            onSelectionChange={handleSelectionChange}
            selectedAccount={selectedAccount}
          />
        ) : null}

        <ScrollView
          style={{
            flex: 1,
          }}
        >
          {accountBalance != null ? (
            <Balance
              accountBalance={accountBalance}
              isBalanceVisible={isBalanceVisible}
              toggleBalanceVisible={toggleBalanceVisible}
            />
          ) : null}

          {bestWorstDay?.bestDay && bestWorstDay?.worstDay && totalTrades ? (
            <DayPerformance
              isBalanceVisible={isBalanceVisible}
              totalTrades={totalTrades}
              bestWorstDay={bestWorstDay}
            />
          ) : null}

          {avgWin != null && avgLoss != null ? (
            <WinRate avgWin={avgWin} avgLoss={avgLoss} />
          ) : null}

          {tradesQueryFetchStatus === "fetching" || isTradesQueryLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loader />
            </View>
          ) : trades && trades.length > 0 && accountBalance ? (
            <TradesChart trades={trades} accountBalance={accountBalance} />
          ) : null}
        </ScrollView>

        <Button
          fullWidth
          id="logTrade"
          accessibilityLabel="Log a trade button"
          title={"Add Trade"}
          onPress={() => addTradeSheetRef.current?.open()}
          //  loading={isLoginLoading}
        />
      </Container>

      <BottomSheet
        ref={addTradeSheetRef}
        height={height * 0.34}
        style={{
          backgroundColor: COLORS[colorScheme].secondaryBackground,
          padding: 14,
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{ fontSize: 18, textAlign: "center", marginVertical: 12 }}
          >
            Add New Trade
          </Text>

          <AddTradeBtn handleButtonChange={handleButtonChange} />

          <TextInput
            keyboardType="number-pad"
            placeholder="$0.00"
            placeholderTextColor={COLORS[colorScheme].inputPlaceholder}
            value={decimalShift}
            onChangeText={handleTextChange}
            style={{
              marginTop: 20,
              marginBottom: 40,
              width: "100%",
              borderRadius: 10,
              backgroundColor: COLORS[colorScheme].inputBackground,
              fontSize: 44,
              textAlign: "center",
              fontWeight: "bold",
              color:
                selectedButton === "winner"
                  ? COLORS[colorScheme].green
                  : COLORS[colorScheme].red,
              borderWidth: 1,
              borderColor: COLORS[colorScheme].inputPlaceholder,
            }}
          />
        </View>

        <Button
          fullWidth
          id="addTrade"
          accessibilityLabel="Add trade button"
          title={"Add"}
          // onPress={() => addTradeSheetRef.current?.open()}
          //  loading={isLoginLoading}
        />
      </BottomSheet>
    </>
  )
}
