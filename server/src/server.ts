import app from "./app"
import env from "./utils/validateEnv"
import mongoose from "mongoose"

const port = env.PORT

mongoose
  .connect(env.MONGODB_URI)
  .then(() => {
    console.log("Mongoose connected")
    app.listen(port, () => {
      console.log("Server running on port: " + port)
    })
  })
  .catch(console.error)
