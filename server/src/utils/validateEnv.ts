import { cleanEnv, port, str } from "envalid"
import dotenv from "dotenv"

//dotenv.config() loads environment variables from your .env file into process.env at runtime.
dotenv.config()

export default cleanEnv(process.env, {
  MONGODB_URI: str(),
  JWT_SECRET: str(),
  PORT: port(),
})
