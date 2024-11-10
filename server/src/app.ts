import express from "express"
import authRouter from "./routes/authRoute"
import errorMiddleware from "./middlewares/errorMiddleware"

const app = express()

app.use(express.json())

//routes
app.use("/api/auth", authRouter)

app.get("/", (req, res) => {
  res.send("Hello world!")
})

app.all("*", (req, _, next) => {
  const errorMessage = `The route ${req.originalUrl} does not exist. Please check the URL.`
  const error = new Error(errorMessage)
  next(error)
})

//middleware
app.use(errorMiddleware)

export default app
