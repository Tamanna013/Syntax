import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMidleware.js";
import { getUserInfo, login, signUp, updateProfile } from "../controllers/AuthController.js";

const authRoutes = Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.get('/user-info', verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);

export default authRoutes;