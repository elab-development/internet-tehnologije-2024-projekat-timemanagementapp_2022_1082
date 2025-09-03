import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getDeletedTasks,
  restoreTask,
  permanentlyDeleteTask,
  emptyTrash
} from "../controllers/tasksController.js";

const router = express.Router();

// Task rute
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask); // sada je ovo soft delete

// Trash rute
router.get("/trash/all", getDeletedTasks);                  // Get all deleted tasks
router.post("/:id/restore", restoreTask);                   // Restore task from trash
router.delete("/:id/permanent", permanentlyDeleteTask);     // Permanently delete task
router.delete("/trash/empty", emptyTrash);                  // Empty entire trash

export default router;