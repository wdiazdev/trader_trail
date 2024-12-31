import Trade from "../models/tradeModel"
import { AsyncRequestHandler } from "../utils/requestHandler"

export const createTrade: AsyncRequestHandler = async (req, res, next) => {
  const { userId, accountId, amount } = req.body

  if (!amount || typeof amount !== "number") {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Invalid or missing amount",
    })
  }

  try {
    const newTrade = new Trade({
      amount,
      account: accountId,
      user: userId,
    })

    const savedTrade = await newTrade.save()

    const response = {
      success: true,
      statusCode: 200,
      message: "Trade created successfully",
      data: {
        tradeId: savedTrade._id,
        amount: savedTrade.amount,
        accountId: savedTrade.account,
        createdAt: savedTrade.createdAt,
      },
    }
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const getTrades: AsyncRequestHandler = async (req, res, next) => {
  const { accountId } = req.params

  try {
    const trades = await Trade.find({ account: accountId })

    const response = {
      success: true,
      statusCode: 200,
      message: "User trades retrieved successfully",
      data: trades.map((trade) => ({
        tradeId: trade._id,
        amount: trade.amount,
        accountId: trade.account,
        createdAt: trade.createdAt,
      })),
    }
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}
