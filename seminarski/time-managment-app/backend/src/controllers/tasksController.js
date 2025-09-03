import { pool } from "../config/db.js"; 

// Get all active tasks (radi samo na ne izbrisanim taskovima)
export async function getAllTasks(req, res) {
  try {
    const { rows } = await pool.query(
      "SELECT id, title, type, created_at, finished_at, complete, updated_at, content FROM tasks WHERE deleted_at IS NULL ORDER BY created_at DESC"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get all deleted tasks (trash)
export async function getDeletedTasks(req, res) {
  try {
    const { rows } = await pool.query(
      "SELECT id, title, type, created_at, finished_at, complete, updated_at, content, deleted_at FROM tasks WHERE deleted_at IS NOT NULL ORDER BY deleted_at DESC"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching deleted tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get single task (ukljucuje izbrisane taskove za restore funkcionalnost)
export async function getTaskById(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "SELECT id, title, type, created_at, finished_at, complete, updated_at, content, deleted_at FROM tasks WHERE id = $1",
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Create task
export async function createTask(req, res) {
  try {
    const { title, type = "normal", finishedAt = null, complete = false, content = "" } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "Title is required and must be a string" });
    }

    const { rows } = await pool.query(
      `INSERT INTO tasks (title, type, created_at, finished_at, complete, content)
       VALUES ($1, $2, NOW(), $3, $4, $5)
       RETURNING id, title, type, created_at, finished_at, complete, updated_at, content;`,
      [title, type, finishedAt, complete, content]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update task (radi samo na ne izbrisanim taskovima)
export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, type, createdAt, finishedAt, complete, content } = req.body;

    const { rows } = await pool.query(
      `UPDATE tasks
       SET
         title = COALESCE($1, title),
         type = COALESCE($2, type),
         created_at = COALESCE($3, created_at),
         finished_at = $4,
         complete = COALESCE($5, complete),
         content = COALESCE($6, content),
         updated_at = NOW()
       WHERE id = $7 AND deleted_at IS NULL
       RETURNING id, title, type, created_at, finished_at, complete, updated_at, content;`,
      [title ?? null, type ?? null, createdAt ?? null, finishedAt ?? null, complete ?? null, content ?? null, id]
    );

    if (rows.length === 0) return res.status(404).json({ error: "Task not found or already deleted" });
    res.status(200).json(rows[0]);
  } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Internal server error" });
  }
}

// Soft delete task (posalji u trash)
export async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "UPDATE tasks SET deleted_at = NOW(), updated_at = NOW() WHERE id = $1 AND deleted_at IS NULL RETURNING id, title, deleted_at",
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Task not found or already deleted" });
    res.status(200).json({ message: "Task moved to trash", task: rows[0] });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Restore task from trash
export async function restoreTask(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "UPDATE tasks SET deleted_at = NULL, updated_at = NOW() WHERE id = $1 AND deleted_at IS NOT NULL RETURNING id, title, type, created_at, finished_at, complete, updated_at, content",
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Task not found in trash" });
    res.status(200).json({ message: "Task restored successfully", task: rows[0] });
  } catch (error) {
    console.error("Error restoring task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Permanently delete task
export async function permanentlyDeleteTask(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query("DELETE FROM tasks WHERE id = $1 AND deleted_at IS NOT NULL", [id]);
    if (rowCount === 0) return res.status(404).json({ error: "Task not found in trash" });
    res.status(204).send();
  } catch (error) {
    console.error("Error permanently deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Empty entire trash
export async function emptyTrash(req, res) {
  try {
    const { rowCount } = await pool.query("DELETE FROM tasks WHERE deleted_at IS NOT NULL");
    res.status(200).json({ message: `${rowCount} tasks permanently deleted from trash` });
  } catch (error) {
    console.error("Error emptying trash:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}