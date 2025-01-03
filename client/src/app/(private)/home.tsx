import React, { useEffect, useState } from "react"
import Container from "@/src/components/Container"
import Text from "@/src/components/Text"
import { useAppContext } from "@/src/store/storeContext"
import { SelectOverlayOption, UserAccount } from "@/src/types"
import Loader from "@/src/components/Loader"
import SelectOverlay from "@/src/components/SelectOverlay"
import Button from "@/src/components/Button"
import { COLORS } from "@/src/constants/Colors"
import useColorScheme from "@/src/hooks/useColorScheme"
import { View } from "react-native"
import useGetAccounts from "@/src/services/useGetAccounts"

export default function Home() {
  const { state } = useAppContext()
  const colorScheme = useColorScheme()

  const [selectedAccount, setSelectedAccount] = useState<UserAccount | undefined>(undefined)

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

  if (!accountsData?.data) {
    return (
      <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", gap: 16 }}>
        <Text
          style={{
            textAlign: "center",
            color: COLORS[colorScheme].altText,
          }}
        >
          It looks like you don’t have any accounts logged yet. Start by creating a trading account
          to track your trades and improve your performance!
        </Text>
        <Button
          id="logAccount"
          accessibilityLabel="Log a trading account"
          title="Log a Trading Account"
        />
      </View>
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

  return (
    <Container justifyContent="flex-start">
      <SelectOverlay
        options={selectOptions}
        onSelectionChange={handleSelectionChange}
        selectedAccount={selectedAccount}
      />
      {isTradesQueryLoading || tradesQueryFetchStatus === "fetching" ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Loader size="large" />
        </View>
      ) : tradesData?.data && tradesData.data.length > 0 ? (
        <>
          {tradesData.data.map((trade) => {
            return (
              <View key={trade.tradeId}>
                <Text>{trade.amount}</Text>
              </View>
            )
          })}
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>No trades found</Text>
        </View>
      )}
    </Container>
  )
}
