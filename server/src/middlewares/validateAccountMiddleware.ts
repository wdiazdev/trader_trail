import mongoose from "mongoose"
import Account from "../models/accountModel"
import { AsyncRequestHandler } from "../utils/requestHandler"

const validateAccountMiddleware: AsyncRequestHandler = async (req, res, next) => {
  const accountId = req.body.accountId || req.params.accountId

  if (!accountId || !mongoose.Types.ObjectId.isValid(accountId)) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Invalid or missing accountId.",
    })
  }

  try {
    const account = await Account.findById(accountId)
    if (!account) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Account not found.",
      })
    }

    next()
  } catch (error) {
    next(error)
  }
}

export default validateAccountMiddleware
