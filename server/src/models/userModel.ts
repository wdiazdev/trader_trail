import mongoose, { InferSchemaType, model, Model } from "mongoose"
import bcryptjs from "bcryptjs"
import validator from "validator"

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

userSchema.statics.signup = async function (email: string, password: string) {
  if (!email || !password) {
    throw Error("All fields are required")
  }

  if (!validator.isEmail(email)) {
    throw Error("Oops! That doesn’t look like a valid email.")
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password’s a bit weak! Try adding 8+ characters, a number, and a symbol.")
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw new Error("Email already in use.")
  }

  const hashPassword = bcryptjs.hashSync(password, 10)

  //toObject() to convert the Mongoose document to a plain JavaScript object
  const user = await this.create({ email, password: hashPassword })

  const { _id } = user.toObject()
  return { _id }
}

userSchema.statics.login = async function (email: string, password: string) {
  if (!email || !password) {
    throw Error("All fields are required")
  }

  if (!validator.isEmail(email)) {
    throw Error("Oops! That doesn’t look like a valid email.")
  }

  const user = await this.findOne({ email })

  if (!user) {
    throw new Error("No account found with this email address.")
  }

  const validPassword = bcryptjs.compareSync(password, user.password)

  if (!validPassword) {
    throw new Error("The password you entered is incorrect.")
  }

  const { _id } = user.toObject()
  return { _id }
}

type User = InferSchemaType<typeof userSchema>

// Defines the IUserModel interface with static methods
interface IUserModel extends Model<User> {
  signup(email: string, password: string): Promise<{ _id: string }>
  login(email: string, password: string): Promise<{ _id: string }>
}

// Defines and export the User model
export default model<User, IUserModel>("User", userSchema)
