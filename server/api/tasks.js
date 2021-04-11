import {
  createTask,
  deleteTask,
  editTask,
  getAllTasks,
} from "../controllers/tasks.js";

import express from "express";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createTask);
router.post("/getTasks", verifyToken, getAllTasks);
router.delete("/:taskId", verifyToken, deleteTask);
// router.get("/:taskId", verifyToken, getTask);
router.put("/:taskId", verifyToken, editTask);

export default router;
