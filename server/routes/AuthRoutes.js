import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMidleware.js";
import { getUserInfo, login, signUp, removeProfileImage, updateProfile, addProfileImage } from "../controllers/AuthController.js";
import multer from "multer";

const authRoutes = Router();
const upload=multer({dest:"uploads/profiles/"});

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.get('/user-info', verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post("/add-profile-image", verifyToken, upload.single("profile-image"), addProfileImage);
authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage)

export default authRoutes;