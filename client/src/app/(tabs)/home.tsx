import React, { useEffect, useState } from "react"
import Container from "@/src/components/Container"
import Text from "@/src/components/Text"
import agent from "@/src/api/agent"
import { useAppContext } from "@/src/store/storeContext"
import { UserAccount } from "@/src/types"
import Loader from "@/src/components/Loader"
import dayjs from "dayjs"

export default function Home() {
  const { state } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<UserAccount[]>()

  useEffect(() => {
    const fetchData = async () => {
      if (state.user?._id) {
        setIsLoading(true)
        try {
          await agent.Account.getAccounts(state.user._id)
            .then((response) => {
              setData(response.data)
            })
            .catch((error) => {
              console.log("error:", error)
            })
        } catch (error) {
          console.error("error:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <Container>
        <Loader size="large" />
      </Container>
    )
  }

  return (
    <Container>
      <Text>Home</Text>
      {data?.map((account) => {
        const formattedDate =
          dayjs(account.createdAt).format("MMMDYY").toUpperCase() +
          account.accountId.slice(-4).toUpperCase()
        return <Text key={account.accountId}>{formattedDate}</Text>
      })}
    </Container>
  )
}
