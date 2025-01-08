import React, { useEffect, useState } from "react"
import Container from "@/src/components/Container"
import Text from "@/src/components/Text"
import { useAppContext } from "@/src/store/storeContext"
import { AccountsData, SelectOverlayOption } from "@/src/types"
import Loader from "@/src/components/Loader"
import SelectOverlay from "@/src/components/SelectOverlay"
import Button from "@/src/components/Button"
import { COLORS } from "@/src/constants/Colors"
import useColorScheme from "@/src/hooks/useColorScheme"
import { Pressable, View } from "react-native"
import useGetAccounts from "@/src/services/useGetAccounts"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import BorderedContainer from "@/src/components/BorderedContainer"

export default function Home() {
  const { state } = useAppContext()
  const colorScheme = useColorScheme()

  const [selectedAccount, setSelectedAccount] = useState<AccountsData | undefined>(undefined)
  const [isBalanceVisible, setIsBalanceVisible] = useState(true)

  const { accountsQuery, tradesQuery } = useGetAccounts(
    state.user?.access_token,
    state.user?.userId || "",
    selectedAccount?.accountId || "",
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
            It looks like you don’t have any accounts logged yet. Start by creating a trading
            account to track your trades and improve your performance!
          </Text>
          <Button
            id="logAccount"
            accessibilityLabel="Log a trading account"
            title="Log a Trading Account"
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
        (account) => account.accountId === selected.description,
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

  const trades = tradesData?.data?.trades || []

  const {
    balance: accountBalance,
    bestWorstDay,
    avgWin,
    avgLoss,
    totalTrades,
  } = tradesData?.data ?? {}

  const { bestDay, worstDay } = bestWorstDay ?? {}

  return (
    <Container justifyContent="flex-start">
      {accountsData.data.length > 0 && (
        <SelectOverlay
          options={selectOptions}
          onSelectionChange={handleSelectionChange}
          selectedAccount={selectedAccount}
        />
      )}
      <View style={{ flexDirection: "column", marginTop: 12 }}>
        <BorderedContainer
          fullWidth
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          padding={14}
        >
          <Text>Balance</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {typeof accountBalance === "number" && (
              <Text
                style={{
                  color: accountBalance > 0 ? COLORS[colorScheme].green : COLORS[colorScheme].red,
                }}
              >
                {isBalanceVisible ? `$${accountBalance.toFixed(2)}` : "*******"}
              </Text>
            )}
            <Pressable onPress={toggleBalanceVisible}>
              <Ionicons
                name="eye-outline"
                size={22}
                color={COLORS[colorScheme].text}
                style={{ marginLeft: 8 }}
              />
            </Pressable>
          </View>
        </BorderedContainer>

        {bestDay && worstDay && totalTrades && (
          <BorderedContainer flexDirection="row" justifyContent="space-between" marginVertical={12}>
            <View
              style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}
            >
              <Text>Best day</Text>
              <Text
                style={{
                  color: bestDay.amount > 0 ? COLORS[colorScheme].green : COLORS[colorScheme].red,
                }}
              >
                {isBalanceVisible ? `${bestDay.amount.toFixed(2)}` : "*******"}
              </Text>
            </View>
            <View
              style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}
            >
              <Text>Total trades</Text>
              <Text>{totalTrades}</Text>
            </View>
            <View
              style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}
            >
              <Text>Worst day</Text>
              <Text
                style={{
                  color: worstDay.amount > 0 ? COLORS[colorScheme].green : COLORS[colorScheme].red,
                }}
              >
                {isBalanceVisible ? `${worstDay.amount.toFixed(2)}` : "*******"}
              </Text>
            </View>
          </BorderedContainer>
        )}

        {avgWin && avgLoss && (
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 6 }}>
            <Text style={{ marginBottom: 4 }}>{`${avgWin}% Win/Loss Ratio ${avgLoss}%`}</Text>
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
                  backgroundColor: "green",
                }}
              />
              <View
                style={{
                  flex: avgLoss,
                  backgroundColor: "red",
                }}
              />
            </View>
          </View>
        )}

        {/* {isTradesQueryLoading || tradesQueryFetchStatus === "fetching" ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Loader size="large" />
          </View>
        ) : trades.length > 0 ? (
          <>
            {trades.map((trade) => {
              return (
                <View key={trade.tradeId}>
                  <Text>{trade.amount}</Text>
                </View>
              )
            })}
          </>
        ) : (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>No trades found</Text>
          </View>
        )} */}
      </View>
    </Container>
  )
}
