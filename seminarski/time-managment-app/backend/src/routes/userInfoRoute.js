import express from "express";
import { getUserStats } from "../controllers/userInfoController.js";

const router = express.Router();

// Get statistiku
router.get("/stats", getUserStats);

export default router;