import { AsyncRequestHandler } from "../utils/requestHandler"
import Account from "../models/accountModel"

export const createAccount: AsyncRequestHandler = async (req, res, next) => {
  const { nickname } = req.body
  const userId = req.user?.userId

  try {
    const createdDate = new Date()
    const month = createdDate.toLocaleString("en-US", { month: "short" }).toUpperCase()
    const day = createdDate.getDate()
    const year = createdDate.getFullYear()
    const accountName = `${month}${day}${year.toString().slice(-2)}`

    const newAccount = await Account.create({
      nickname,
      user: userId,
      accountName,
    })

    const lastFourId = newAccount._id.toString().slice(-4).toUpperCase()
    const finalAccountName = `${accountName}${lastFourId}`

    newAccount.accountName = finalAccountName
    await newAccount.save()

    const response = {
      success: true,
      statusCode: 201,
      message: "Account created successfully",
      data: {
        accountId: newAccount._id,
        accountName: finalAccountName,
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

export const getAllAccounts: AsyncRequestHandler = async (req, res, next) => {
  const userId = req.user?.userId

  try {
    const accounts = await Account.find({ user: userId })

    if (accounts.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "No accounts found for this user.",
        data: [],
      })
    }

    const response = {
      success: true,
      statusCode: 200,
      message: "User accounts retrieved successfully",
      data: accounts.map((account) => ({
        accountId: account._id,
        accountName: account.accountName,
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
  try {
    if (!req.account) {
      return res.status(400).json({
        success: false,
        message: "No account found in the request context.",
      })
    }

    const deletedAccount = await Account.findByIdAndDelete(req.account.accountId)

    if (!deletedAccount) {
      return res.status(404).json({
        success: false,
        message: "Account not found or already deleted.",
      })
    }

    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

export const updateAccount: AsyncRequestHandler = async (req, res, next) => {
  const { nickname } = req.body

  if (!nickname) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "nickname is required",
    })
  }

  try {
    if (!req.account) {
      return res.status(400).json({
        success: false,
        message: "No account found in the request context.",
      })
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      req.account.accountId,
      { $set: { nickname } },
      { new: true },
    )

    if (!updatedAccount) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Account not found or update failed.",
      })
    }

    const response = {
      success: true,
      statusCode: 200,
      message: "Account updated successfully",
      data: {
        accountId: updatedAccount._id,
        accountName: updatedAccount.accountName,
        nickname: updatedAccount.nickname,
        createdAt: updatedAccount.createdAt,
      },
    }
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}
