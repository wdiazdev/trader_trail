import express from "express"
import { signupUser, loginUser } from "../controller/authController"
import { validateAuthMiddleware } from "../middlewares/validateAuthMiddleware"

const router = express.Router()

router.post("/login", validateAuthMiddleware({ requireStrongPassword: false }), loginUser)

router.post("/signup", validateAuthMiddleware({ requireStrongPassword: true }), signupUser)

export default router
