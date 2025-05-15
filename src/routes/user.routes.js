import express from "express";

import {
	loginUser,
	registerUser,
	userProfile,
	verifyUser,
} from "../controllers/user.controllers.js";

import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.get("/verify/:token", verifyUser);

router.post("/login", loginUser);

router.get("/profile", isLoggedIn, userProfile);

export default router;
