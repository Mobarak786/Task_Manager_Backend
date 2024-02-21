import express from "express";
const router = express.Router();

import { jwtAuth } from "../Middleware/jwtAuthentication.js";
import {
  addTasks,
  getAllTasks,
  editTasks,
  deleteTasks,
} from "../Controllers/task.controller.js";

router.post("/addTasks", jwtAuth, addTasks);
router.get("/allTasks", jwtAuth, getAllTasks);
router.patch("/editTask/:taskId", jwtAuth, editTasks);
router.delete("/deleteTask/:taskId", jwtAuth, deleteTasks);

export default router;
