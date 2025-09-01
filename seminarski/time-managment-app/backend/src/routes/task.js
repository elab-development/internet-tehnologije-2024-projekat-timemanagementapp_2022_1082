const express = require("express");
const router = express.Router();
const { pool } = require("../db");

// ✅ Get all tasks
router.get("/", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT id, title, type, created_at, finished_at, complete, updated_at FROM tasks ORDER BY created_at DESC"
  );
  res.json(rows);
});

// ✅ Get single task
router.get("/:id", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT id, title, type, created_at, finished_at, complete, updated_at FROM tasks WHERE id = $1",
    [req.params.id]
  );
  if (rows.length === 0) return res.status(404).json({ error: "Task not found" });
  res.json(rows[0]);
});

// ✅ Create task
router.post("/", async (req, res) => {
  const { title, type = "normal", createdAt = Date.now(), finishedAt = null, complete = false } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "Title is required and must be a string" });
  }

  const { rows } = await pool.query(
    `INSERT INTO tasks (title, type, created_at, finished_at, complete)
     VALUES ($1, $2, NOW(), $3, $4)
     RETURNING id, title, type, created_at, finished_at, complete, updated_at;`,
    [title, type, finishedAt, complete]
  );

  res.status(201).json(rows[0]);
});

// ✅ Update task
router.put("/:id", async (req, res) => {
  const { title, type, createdAt, finishedAt, complete } = req.body;

  const { rows } = await pool.query(
    `UPDATE tasks
     SET
       title = COALESCE($1, title),
       type = COALESCE($2, type),
       created_at = COALESCE($3, created_at),
       finished_at = $4,
       complete = COALESCE($5, complete),
       updated_at = NOW()
     WHERE id = $6
     RETURNING id, title, type, created_at, finished_at, complete, updated_at`,
    [title ?? null, type ?? null, createdAt ?? null, finishedAt ?? null, complete ?? null, req.params.id]
  );

  if (rows.length === 0) return res.status(404).json({ error: "Task not found" });
  res.json(rows[0]);
});

// ✅ Delete task
router.delete("/:id", async (req, res) => {
  const { rowCount } = await pool.query("DELETE FROM tasks WHERE id = $1", [req.params.id]);
  if (rowCount === 0) return res.status(404).json({ error: "Task not found" });
  res.status(204).send();
});

module.exports = router;