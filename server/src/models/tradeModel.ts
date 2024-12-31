import mongoose from "mongoose"

const Schema = mongoose.Schema

const tradeSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
)

const Trade = mongoose.model("Trade", tradeSchema)

export default Trade
