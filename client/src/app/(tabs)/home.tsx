import React, { useEffect, useState } from "react"
import Container from "@/src/components/Container"
import Text from "@/src/components/Text"
import agent from "@/src/api/agent"
import { useAppContext } from "@/src/store/storeContext"
import { UserAccount } from "@/src/types"

export default function Home() {
  const { state } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<UserAccount[]>()

  useEffect(() => {
    const fetchData = async () => {
      if (state.user?._id) {
        setIsLoading(true)
        try {
          const response = await agent.Account.getAccounts(state.user._id)
          if (response.data) setData(response.data)
        } catch (error) {
          console.error("error:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchData()
  }, [])

  return (
    <Container>
      <Text>Home</Text>
    </Container>
  )
}
