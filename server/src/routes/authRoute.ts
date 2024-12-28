import express from "express"
import { signupUser, loginUser, deleteUser } from "../controller/authController"
import { validateAuthFieldsMiddleware } from "../middlewares/validateAuthFieldsMiddleware"
import authMiddleware from "../middlewares/authMiddleware"

const router = express.Router()

router.post("/login", validateAuthFieldsMiddleware({ requireStrongPassword: false }), loginUser)

router.post("/signup", validateAuthFieldsMiddleware({ requireStrongPassword: true }), signupUser)

router.delete("/delete/:userId", authMiddleware, deleteUser)

export default router
