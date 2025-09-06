import express from "express";
import { getAllTypes } from "../controllers/typesController.js";

const router = express.Router();

router.get("/", getAllTypes);

export default router;