import User from "../models/userModel"
import Account from "../models/accountModel"
import { AsyncRequestHandler } from "../utils/requestHandler"

const validateUserAndAccountMiddleware: AsyncRequestHandler = async (req, res, next) => {
  const { userId, accountId } = req.body

  if (!userId || !accountId) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "userId and accountId are required.",
    })
  }

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User not found.",
      })
    }

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

export default validateUserAndAccountMiddleware
