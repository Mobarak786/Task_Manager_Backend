import express from "express";
const router = express.Router();

import {
  addTasks,
  getAllTasks,
  editTasks,
  deleteTasks,
} from "../Controllers/task.controller.js";

router.post("/addTasks", addTasks);
router.get("/allTasks", getAllTasks);
router.patch("/editTask/:taskId", editTasks);
router.delete("/deleteTask/:taskId", deleteTasks);

export default router;
