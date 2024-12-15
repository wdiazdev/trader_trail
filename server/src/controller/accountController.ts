import { AsyncRequestHandler } from "../utils/requestHandler"
import User from "../models/userModel"
import Account from "../models/accountModel"

export const createAccount: AsyncRequestHandler = async (req, res, next) => {
  const { userId, nickname } = req.body

  if (!userId) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "userId is required",
    })
  }

  try {
    const user = await User.findById({ _id: userId })

    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User not found.",
      })
    }

    const newAccount = await Account.create({
      nickname,
      user: userId,
    })

    const response = {
      success: true,
      statusCode: 201,
      message: "Account created successfully",
      data: {
        accountId: newAccount._id,
        nickname: newAccount.nickname,
        createdAt: newAccount.createdAt,
        userId: newAccount.user,
      },
    }
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

export const getAccounts: AsyncRequestHandler = async (req, res, next) => {
  const { userId } = req.params

  if (!userId) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "userId is required",
    })
  }

  try {
    const user = await User.findById({ _id: userId })

    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User not found.",
      })
    }

    const accounts = await Account.find({ user: userId })

    const response = {
      success: true,
      statusCode: 200,
      message: "User accounts retrieved successfully",
      data: accounts.map((account) => ({
        accountId: account._id,
        nickname: account.nickname,
        createdAt: account.createdAt,
      })),
    }
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const deleteAccount: AsyncRequestHandler = async (req, res, next) => {
  const { accountId } = req.params

  if (!accountId) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "accountId is required",
    })
  }

  try {
    const account = await Account.findByIdAndDelete({ _id: accountId })

    if (!account) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Account not found.",
      })
    }

    res.status(204).json()
  } catch (error) {
    next(error)
  }
}

export const updateAccount: AsyncRequestHandler = async (req, res, next) => {
  const { accountId } = req.params
  const { nickname } = req.body

  if (!accountId || !nickname) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: !accountId ? "accountId is required" : "nickname is required",
    })
  }

  try {
    const updatedAccount = await Account.findByIdAndUpdate(
      accountId,
      { $set: { nickname } },
      { new: true },
    )

    if (!updatedAccount) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Account not found.",
      })
    }

    const response = {
      success: true,
      statusCode: 200,
      message: "Account updated successfully",
      data: {
        accountId: updatedAccount._id,
        nickname: updatedAccount.nickname,
        createdAt: updatedAccount.createdAt,
      },
    }
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}
