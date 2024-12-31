import express from "express"
import authMiddleware from "../middlewares/authMiddleware"
import { createTrade, getTrades } from "../controller/tradeController"
import validateAccountMiddleware from "../middlewares/validateAccountMiddleware"

const router = express.Router()

router.post("/create", authMiddleware, validateAccountMiddleware, createTrade)
router.get("/get/:accountId", authMiddleware, validateAccountMiddleware, getTrades)

export default router
