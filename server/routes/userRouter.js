import express from "express";
import {
  login,
  logout,
  myProfile,
  register,
} from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Route to handle user login
router.post("/login", login);

// Route to handle user logout
router.get("/logout", isAuthenticated, logout);

// Route to fetch the profile of the authenticated user
router.get("/me", isAuthenticated, myProfile);

// Route to register a new user
router.post("/register", register);

export default router;
