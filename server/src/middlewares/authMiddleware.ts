import jwt, { JwtPayload } from "jsonwebtoken"
import env from "../utils/validateEnv"
import { AsyncRequestHandler } from "../utils/requestHandler"
import User from "../models/userModel"

interface CustomJwtPayload extends JwtPayload {
  userId: string
}

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
    const decoded = jwt.verify(token, env.JWT_SECRET)
    const userId = (decoded as CustomJwtPayload).userId
    const user = await User.findById(userId)

    if (user) next()
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
