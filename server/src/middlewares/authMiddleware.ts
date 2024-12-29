import jwt from "jsonwebtoken"
import env from "../utils/validateEnv"
import { AsyncRequestHandler } from "../utils/requestHandler"
import User from "../models/userModel"

const authMiddleware: AsyncRequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Unauthorized. No access token provided.",
    })
  }

  try {
    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string }
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized.",
      })
    }

    req.user = {
      userId: user._id.toString(),
      token,
    }

    next()
  } catch (error: any) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized. Invalid or expired token.",
      })
    }

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error.",
    })
  }
}

export default authMiddleware
