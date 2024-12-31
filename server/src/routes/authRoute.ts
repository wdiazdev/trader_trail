import express from "express"
import { signupUser, loginUser, deleteUser, getUser } from "../controller/authController"
import authMiddleware from "../middlewares/authMiddleware"
import validateAuthFieldsMiddleware from "../middlewares/validateAuthFieldsMiddleware"

const router = express.Router()

router.post("/login", validateAuthFieldsMiddleware({ requireStrongPassword: false }), loginUser)
router.post("/signup", validateAuthFieldsMiddleware({ requireStrongPassword: true }), signupUser)
router.delete("/delete/:userId", authMiddleware, deleteUser)
router.get("/getUser", authMiddleware, getUser)

export default router
