import express from "express";
import { getUsers, updateUsers } from "../Controllers/user.controller.js";

const router = express.Router();
router.get("/user/:uid", getUsers);
router.patch("/update/:userId", updateUsers);

export default router;
