import express from "express";
const router = express.Router();
import {
  registerController,
  loginController,
  logoutController,
} from "../Controllers/auth.controller.js";

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);

export default router;
