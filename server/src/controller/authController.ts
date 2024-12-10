import { AsyncRequestHandler } from "../utils/requestHandler"
import User from "../models/userModel"
import createToken from "../utils/createToken"
import bcryptjs from "bcryptjs"

export const signupUser: AsyncRequestHandler = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const exists = await User.findOne({ email })

    if (exists) {
      throw new Error("Email already in use.")
    }

    const hashPassword = bcryptjs.hashSync(password, 10)

    const user = await User.create({ email, password: hashPassword })

    //toObject() to convert the Mongoose document to a plain JavaScript object
    const { _id, createdAt } = user.toObject()

    const response = {
      success: true,
      statusCode: 201,
      message: "User created successfully!",
      data: { _id, createdAt },
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
      throw new Error("No account found.")
    }

    const validPassword = bcryptjs.compareSync(password, user.password)

    if (!validPassword) {
      throw new Error("The password you entered is incorrect.")
    }

    //toObject() to convert the Mongoose document to a plain JavaScript object
    const { _id, createdAt } = user.toObject()

    const token = createToken(_id.toString())

    const response = {
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: { _id, createdAt, token: token },
    }
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}
