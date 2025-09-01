import express from "express";
import { getAllUsers, createUser } from "../controllers/usersController.js";
import { checkAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all users (admin only)
router.get("/", checkAdmin, getAllUsers);

// POST create user (admin only)
router.post("/", checkAdmin, createUser);

export default router;
