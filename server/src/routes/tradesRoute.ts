import express from "express"
import authMiddleware from "../middlewares/authMiddleware"
import { createTrade, getTrades } from "../controller/tradeController"
import validateUserAndAccountMiddleware from "../middlewares/validateUserAndAccountMiddleware"

const router = express.Router()

router.post("/create", authMiddleware, validateUserAndAccountMiddleware, createTrade)
router.get("/get/:accountId", authMiddleware, getTrades)

export default router
