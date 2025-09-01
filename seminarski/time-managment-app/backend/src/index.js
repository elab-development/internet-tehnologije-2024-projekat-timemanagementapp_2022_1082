require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { verifyConnection } = require("./db");

const tasksRouter = require("./routes/task");

const app = express();
const PORT = process.env.PORT || 3000;

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

// Start server
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
