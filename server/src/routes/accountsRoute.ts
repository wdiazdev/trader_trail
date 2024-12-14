import express from "express"
import { createAccount, getAccounts, deleteAccount } from "../controller/accountController"

const router = express.Router()

router.post("/create", createAccount)
router.get("/", getAccounts)
router.delete("/delete", deleteAccount)

export default router
