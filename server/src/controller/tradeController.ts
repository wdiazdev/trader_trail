import Trade from "../models/tradeModel"
import { AsyncRequestHandler } from "../utils/requestHandler"

type BestWorstDay = {
  bestDay: { date: Date; amount: number } | null
  worstDay: { date: Date; amount: number } | null
}

export const createTrade: AsyncRequestHandler = async (req, res, next) => {
  const { accountId, amount } = req.body
  const userId = req.user?.userId

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
        userId: savedTrade.user,
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
    const accountTrades = await Trade.find({ account: accountId })

    const trades = accountTrades.map((trade) => ({
      tradeId: trade._id,
      amount: trade.amount,
      createdAt: trade.createdAt,
    }))

    const balance = parseFloat(trades.reduce((acc, trade) => acc + trade.amount, 0).toFixed(2))

    const totalTrades = trades.length

    const avgWin = parseFloat(
      (trades.filter((trade) => trade.amount > 0).length / totalTrades).toFixed(2),
    )

    const avgLoss = parseFloat(
      (trades.filter((trade) => trade.amount < 0).length / totalTrades).toFixed(2),
    )

    const bestWorstDay = trades.reduce<BestWorstDay>(
      (acc, trade) => {
        const tradeDate = new Date(trade.createdAt)

        if (!acc.bestDay || trade.amount > acc.bestDay.amount) {
          acc.bestDay = { date: tradeDate, amount: parseFloat(trade.amount.toFixed(2)) }
        }

        if (!acc.worstDay || trade.amount < acc.worstDay.amount) {
          acc.worstDay = { date: tradeDate, amount: parseFloat(trade.amount.toFixed(2)) }
        }

        return acc
      },
      { bestDay: null, worstDay: null },
    )

    const response = {
      success: true,
      statusCode: 200,
      message: "User trades retrieved successfully",
      data: {
        accountId: accountId,
        balance,
        totalTrades,
        avgWin,
        avgLoss,
        bestWorstDay,
        trades,
      },
    }
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const deleteTrade: AsyncRequestHandler = async (req, res, next) => {
  const { tradeId } = req.params

  const userId = req.user?.userId

  if (!tradeId) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "A valid tradeId is required.",
    })
  }

  try {
    const trade = await Trade.findById(tradeId)

    if (!trade) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Trade not found.",
      })
    }

    if (trade.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "You are not authorized to delete this trade.",
      })
    }

    await trade.deleteOne()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

export const updateTrade: AsyncRequestHandler = async (req, res, next) => {
  const { tradeId, amount } = req.body

  if (!amount || typeof amount !== "number") {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Invalid or missing amount",
    })
  }

  try {
    const updatedTrade = await Trade.findByIdAndUpdate(tradeId, { $set: { amount } }, { new: true })

    if (!updatedTrade) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Trade not found or update failed.",
      })
    }

    const response = {
      success: true,
      statusCode: 200,
      message: "Trade updated successfully",
      data: {
        tradeId: updatedTrade._id,
        amount: updatedTrade.amount,
        createdAt: updatedTrade.createdAt,
      },
    }
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}
