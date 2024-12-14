import express from "express"
import { signupUser, loginUser } from "../controller/authController"
import { validateAuthFieldsMiddleware } from "../middlewares/validateAuthFieldsMiddleware"

const router = express.Router()

router.post("/login", validateAuthFieldsMiddleware({ requireStrongPassword: false }), loginUser)

router.post("/signup", validateAuthFieldsMiddleware({ requireStrongPassword: true }), signupUser)

export default router
