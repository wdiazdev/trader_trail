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
import { View, ScrollView, Dimensions } from "react-native"
import useGetAccounts from "@/src/services/useGetAccounts"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Balance from "../../components/Balance"
import DayPerformance from "../../components/DayPerformance"
import WinRate from "../../components/WinRate"
import TradesChart from "@/src/components/TradesChart"
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet"
import AddTradeBtn from "@/src/shared/AddTradeBtn"

const { height } = Dimensions.get("window")

export default function Home() {
  const { state } = useAppContext()
  const colorScheme = useColorScheme()

  const addTradeSheetRef = useRef<BottomSheetMethods>(null)

  const [selectedAccount, setSelectedAccount] = useState<
    AccountsData | undefined
  >(undefined)
  const [isBalanceVisible, setIsBalanceVisible] = useState(true)

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
        {selectOptions?.length && (
          <SelectOverlay
            options={selectOptions}
            onSelectionChange={handleSelectionChange}
            selectedAccount={selectedAccount}
          />
        )}

        <ScrollView
          style={{
            flex: 1,
            marginTop: 12,
          }}
        >
          {accountBalance != null && (
            <Balance
              accountBalance={accountBalance}
              isBalanceVisible={isBalanceVisible}
              toggleBalanceVisible={toggleBalanceVisible}
            />
          )}

          {bestWorstDay?.bestDay && bestWorstDay?.worstDay && totalTrades && (
            <DayPerformance
              isBalanceVisible={isBalanceVisible}
              totalTrades={totalTrades}
              bestWorstDay={bestWorstDay}
            />
          )}

          {avgWin != null && avgLoss != null && (
            <WinRate avgWin={avgWin} avgLoss={avgLoss} />
          )}

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
        height={height * 0.4}
        style={{
          backgroundColor: COLORS[colorScheme].background,
          padding: 14,
        }}
      >
        <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 18 }}>
          Add New trade
        </Text>
        <AddTradeBtn
          RightBtnText="Add"
          onCancel={() => addTradeSheetRef.current?.close()}
          onConfirm={() => console.log("trade added")}
        />
      </BottomSheet>
    </>
  )
}
