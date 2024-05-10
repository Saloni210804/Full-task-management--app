import {
  createTask,
  deleteTask,
  getMyTask,
  getSingleTask,
  updateTask,
} from "../controller/taskController.js";
import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Route to create a new task
router.post("/post", isAuthenticated, createTask);

// Route to delete a task by its ID
router.delete("/delete/:id", isAuthenticated, deleteTask);

// Route to update a task by its ID
router.put("/update/:id", isAuthenticated, updateTask);

// Route to get all tasks created by the authenticated user
router.get("/mytask", isAuthenticated, getMyTask);

// Route to get a single task by its ID
router.get("/single/:id", isAuthenticated, getSingleTask);

export default router;
