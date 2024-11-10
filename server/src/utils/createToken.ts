import jwt from "jsonwebtoken"
import env from "../utils/validateEnv"

export default function createToken(_id: string) {
  return jwt.sign({ _id }, env.JWT_SECRET, {
    expiresIn: "3d",
  })
}
