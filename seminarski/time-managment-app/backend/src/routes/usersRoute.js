import express from "express";
import { getAllUsers, createUser, deleteUser } from "../controllers/usersController.js";
import { checkAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", checkAdmin, getAllUsers);
router.post("/", checkAdmin, createUser);
router.delete("/:id", checkAdmin, deleteUser);  

export default router;
