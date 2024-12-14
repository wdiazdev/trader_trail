import mongoose from "mongoose"

const Schema = mongoose.Schema

const accountsSchema = new Schema(
  {
    nickname: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
)

const Account = mongoose.model("Account", accountsSchema)

export default Account
