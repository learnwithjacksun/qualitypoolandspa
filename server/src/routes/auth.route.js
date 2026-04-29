import { Router } from "express";
import { checkAuth, login, register } from "../controllers/auth.controller.js";
import verifyToken from "../middleware/auth.middleware.js";

const authRouter = Router();


authRouter.post("/register", register);
authRouter.post("/login", login)
authRouter.post("/check", verifyToken, checkAuth)

export default authRouter
