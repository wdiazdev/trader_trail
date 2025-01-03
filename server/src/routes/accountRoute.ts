import express from "express"
import {
  createAccount,
  getAllAccounts,
  deleteAccount,
  updateAccount,
} from "../controller/accountController"
import authMiddleware from "../middlewares/authMiddleware"

const router = express.Router()

router.post("/create", authMiddleware, createAccount)
router.get("/user/:userId", authMiddleware, getAllAccounts)
router.delete("/delete/:accountId", authMiddleware, deleteAccount)
router.patch("/update", authMiddleware, updateAccount)

export default router
