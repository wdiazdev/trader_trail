import express from "express"
import {
  createAccount,
  getAccounts,
  deleteAccount,
  updateAccount,
} from "../controller/accountController"
import authMiddleware from "../middlewares/authMiddleware"

const router = express.Router()

router.post("/create", authMiddleware, createAccount)
router.get("/user/:userId", authMiddleware, getAccounts)
router.delete("/delete/:accountId", authMiddleware, deleteAccount)
router.patch("/update/:accountId", authMiddleware, updateAccount)

export default router
