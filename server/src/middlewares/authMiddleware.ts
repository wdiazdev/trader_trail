import jwt from "jsonwebtoken"
import env from "../utils/validateEnv"
import { AsyncRequestHandler } from "../utils/requestHandler"

const authMiddleware: AsyncRequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. No token provided.",
    })
  }

  const token = authHeader.split(" ")[1]

  try {
    // Verify the token and extract the payload
    const decoded = jwt.verify(token, env.JWT_SECRET)

    // Attach user data to the request object
    req.user = { userId: decoded.userId }
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Invalid or expired token.",
    })
  }
}

export default authMiddleware
