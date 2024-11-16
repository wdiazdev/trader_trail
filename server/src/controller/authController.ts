import { AsyncRequestHandler } from "../utils/requestHandler"
import User from "../models/userModel"
import createToken from "../utils/createToken"

export const signupUser: AsyncRequestHandler = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password)

    const token = createToken(user._id)

    const response = {
      success: true,
      statusCode: 201,
      message: "User created successfully!",
      data: { ...user, token: token },
    }
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

export const loginUser: AsyncRequestHandler = async (req, res, next) => {
  console.log("req:", req.body)
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    const token = createToken(user._id)

    const response = {
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: { ...user, token: token },
    }
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}
