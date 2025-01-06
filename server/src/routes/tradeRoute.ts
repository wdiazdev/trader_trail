import express from "express"
import authMiddleware from "../middlewares/authMiddleware"
import {
  createTrade,
  deleteAllTrades,
  deleteTrade,
  getTrades,
  updateTrade,
} from "../controller/tradeController"
import validateAccountMiddleware from "../middlewares/validateAccountMiddleware"

const router = express.Router()

router.post("/create", authMiddleware, validateAccountMiddleware, createTrade)
router.get("/get/:accountId", authMiddleware, validateAccountMiddleware, getTrades)
router.patch("/update", authMiddleware, validateAccountMiddleware, updateTrade)
router.delete("/delete/:accountId/:tradeId", authMiddleware, validateAccountMiddleware, deleteTrade)
router.delete("/deleteAll/:accountId", authMiddleware, validateAccountMiddleware, deleteAllTrades)

export default router
