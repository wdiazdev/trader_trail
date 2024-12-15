import express from "express"
import { createAccount, getAccounts, deleteAccount } from "../controller/accountController"
import authMiddleware from "../middlewares/authMiddleware"

const router = express.Router()

router.post("/create", authMiddleware, createAccount)
router.get("/", authMiddleware, getAccounts)
router.delete("/delete", authMiddleware, deleteAccount)

export default router
