import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent"

type CreateTradeParams = {
  accountId: string
  amount: number
}

export default function useGetTrades(accountId: string): {
  createTradeMutation: UseMutationResult<any, unknown, CreateTradeParams, unknown>
} {
  const queryClient = useQueryClient()

  return {
    createTradeMutation: useMutation<any, unknown, CreateTradeParams>({
      mutationFn: async (createTradeParams: CreateTradeParams) =>
        await agent.Trade.createTrade({
          accountId: createTradeParams.accountId,
          amount: createTradeParams.amount,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getTrades", accountId] })
      },
    }),
  }
}
