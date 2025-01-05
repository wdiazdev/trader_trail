import express from "express"
import authMiddleware from "../middlewares/authMiddleware"
import { createTrade, deleteTrade, getTrades } from "../controller/tradeController"
import validateAccountMiddleware from "../middlewares/validateAccountMiddleware"

const router = express.Router()

router.post("/create", authMiddleware, validateAccountMiddleware, createTrade)
router.get("/get/:accountId", authMiddleware, validateAccountMiddleware, getTrades)
router.delete("/delete/:tradeId", authMiddleware, deleteTrade)

export default router
