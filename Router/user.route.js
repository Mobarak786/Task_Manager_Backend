import express from "express";
import { getUsers, updateUsers } from "../Controllers/user.controller.js";
import { jwtAuth } from "../Middleware/jwtAuthentication.js";

const router = express.Router();
router.get("/user/:uid", jwtAuth, getUsers);
router.patch("/update/:userId", jwtAuth, updateUsers);

export default router;
