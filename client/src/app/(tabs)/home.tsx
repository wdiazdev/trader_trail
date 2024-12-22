import React, { useEffect, useState } from "react"
import Container from "@/src/components/Container"
import Text from "@/src/components/Text"
import agent from "@/src/api/agent"
import { useAppContext } from "@/src/store/storeContext"
import { SelectOverlayOption, UserAccount } from "@/src/types"
import Loader from "@/src/components/Loader"
import SelectOverlay from "@/src/components/SelectOverlay"

export default function Home() {
  const { state } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  const [accountsData, setaAccountsData] = useState<UserAccount[]>()
  const [selectedAccount, setSelectedAccount] = useState<UserAccount | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      if (state.user?._id) {
        setIsLoading(true)
        try {
          const response = await agent.Account.getAccounts(state.user._id)
          setaAccountsData(response.data)
        } catch (error) {
          console.error("Error fetching accounts:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchData()
  }, [state.user?._id])

  useEffect(() => {
    if (accountsData && accountsData.length > 0) {
      setSelectedAccount(accountsData[0])
    }
  }, [accountsData])

  if (isLoading) {
    return (
      <Container>
        <Loader size="large" />
      </Container>
    )
  }

  const selectOptions = accountsData?.map((account) => {
    return {
      label: account.accountName,
      description: account.accountId,
    }
  })

  const handleSelectionChange = (selected: SelectOverlayOption | undefined) => {
    if (selected && accountsData) {
      const account = accountsData.find((account) => account.accountId === selected.description)
      if (account) setSelectedAccount(account)
    }
  }

  return (
    <Container>
      <SelectOverlay options={selectOptions} onSelectionChange={handleSelectionChange} />
      <Text>Home</Text>
      <Text>{selectedAccount?.accountName || "No account selected"}</Text>
    </Container>
  )
}
