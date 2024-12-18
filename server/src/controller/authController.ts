import { AsyncRequestHandler } from "../utils/requestHandler"
import User from "../models/userModel"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import env from "../utils/validateEnv"

export const signupUser: AsyncRequestHandler = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const exists = await User.findOne({ email })

    if (exists) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Email already in use.",
      })
    }

    const hashPassword = bcryptjs.hashSync(password, 10)

    const user = await User.create({ email, password: hashPassword })

    const response = {
      success: true,
      statusCode: 201,
      message: "User created successfully!",
      data: { userId: user._id, createdAt: user.createdAt },
    }
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

export const loginUser: AsyncRequestHandler = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "No user account found.",
      })
    }

    const validPassword = bcryptjs.compareSync(password, user.password)

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Incorrect password.",
      })
    }

    const userId = user._id.toString()

    const token = jwt.sign({ userId }, env.JWT_SECRET, {
      expiresIn: "3d",
    })

    const response = {
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: { userId: user._id, token: token },
    }
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}
