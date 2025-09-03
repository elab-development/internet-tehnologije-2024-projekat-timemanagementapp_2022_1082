import "dotenv/config";
import express from "express";
import cors from "cors";
import { verifyConnection } from "./config/db.js";

import tasksRouter from "./routes/tasksRoute.js";
import usersRouter from "./routes/usersRoute.js";
import userInfoRouter from "./routes/userInfoRoute.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", async (req, res) => {
  try {
    const now = await verifyConnection();
    res.json({ ok: true, time: now });
  } catch (err) {
    res.status(500).json({ ok: false, error: "Database not reachable" });
  }
});

// Routes
app.use("/api/tasks", tasksRouter);
app.use("/api/users", usersRouter);
app.use("/api/user-info", userInfoRouter);

app.listen(PORT, () => {
  console.log("Database runned successfully!");
  console.log(`API listening on http://localhost:${PORT}`);
});