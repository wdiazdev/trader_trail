import express from "express"
import {
  createAccount,
  getAllAccounts,
  deleteAccount,
  updateAccount,
} from "../controller/accountController"
import authMiddleware from "../middlewares/authMiddleware"
import validateAccountMiddleware from "../middlewares/validateAccountMiddleware"

const router = express.Router()

router.post("/create", authMiddleware, createAccount)
router.get("/getAccounts", authMiddleware, getAllAccounts)
router.delete("/delete/:accountId", authMiddleware, validateAccountMiddleware, deleteAccount)
router.patch("/update", authMiddleware, validateAccountMiddleware, updateAccount)

export default router
