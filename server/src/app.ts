import express from "express"
import cors from "cors"
import authRouter from "./routes/authRoute"
import accountRouter from "./routes/accountRoute"
import tradeRouter from "./routes/tradeRoute"
import errorMiddleware from "./middlewares/errorMiddleware"

const app = express()

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  }),
)

app.use(express.json())

//Routes
app.use("/api/auth", authRouter)
app.use("/api/account", accountRouter)
app.use("/api/trade", tradeRouter)

app.get("/", (req, res) => {
  res.send("Hello world!")
})

app.all("*", (req, _, next) => {
  const errorMessage = `The route ${req.originalUrl} does not exist. Please check the URL.`
  const error = new Error(errorMessage)
  next(error)
})

//Middleware
app.use(errorMiddleware)

export default app
