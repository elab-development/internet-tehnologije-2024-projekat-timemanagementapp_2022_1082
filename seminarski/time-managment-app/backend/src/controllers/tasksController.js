import { pool } from "../config/db.js"; 

// Helper funkcija da dobijemo type_id iz naziva tipa
async function getTypeIdByName(typeName) {
  const { rows } = await pool.query("SELECT id FROM types WHERE name = $1", [typeName]);
  if (rows.length === 0) {
    throw new Error(`Invalid task type: ${typeName}`);
  }
  return rows[0].id;
}

// Get all active tasks (radi samo na ne izbrisanim taskovima)
export async function getAllTasks(req, res) {
  try {
    const { rows } = await pool.query(
      `SELECT t.id, t.title, ty.name AS type, t.created_at, t.finished_at, t.complete, t.updated_at, t.content
       FROM tasks t
       LEFT JOIN types ty ON t.type_id = ty.id
       WHERE t.deleted_at IS NULL
       ORDER BY t.created_at DESC`
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
      `SELECT t.id, t.title, ty.name AS type, t.created_at, t.finished_at, t.complete, t.updated_at, t.content, t.deleted_at
       FROM tasks t
       LEFT JOIN types ty ON t.type_id = ty.id
       WHERE t.deleted_at IS NOT NULL
       ORDER BY t.deleted_at DESC`
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
      `SELECT t.id, t.title, ty.name AS type, t.created_at, t.finished_at, t.complete, t.updated_at, t.content, t.deleted_at
       FROM tasks t
       LEFT JOIN types ty ON t.type_id = ty.id
       WHERE t.id = $1`,
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

    // Dobavi type_id iz naziva tipa
    const typeId = await getTypeIdByName(type);

    const { rows } = await pool.query(
      `INSERT INTO tasks (title, type_id, created_at, finished_at, complete, content)
       VALUES ($1, $2, NOW(), $3, $4, $5)
       RETURNING id, title, created_at, finished_at, complete, updated_at, content`,
      [title, typeId, finishedAt, complete, content]
    );

    // Dodaj naziv tipa u rezultat
    const task = rows[0];
    task.type = type;

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    if (error.message.startsWith("Invalid task type")) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update task (radi samo na ne izbrisanim taskovima)
export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, type, createdAt, finishedAt, complete, content } = req.body;

    let typeId = null;
    if (type !== undefined) {
      typeId = await getTypeIdByName(type);
    }

    const { rows } = await pool.query(
      `UPDATE tasks
       SET
         title = COALESCE($1, title),
         type_id = COALESCE($2, type_id),
         created_at = COALESCE($3, created_at),
         finished_at = $4,
         complete = COALESCE($5, complete),
         content = COALESCE($6, content),
         updated_at = NOW()
       WHERE id = $7 AND deleted_at IS NULL
       RETURNING id, title, created_at, finished_at, complete, updated_at, content, type_id`,
      [title ?? null, typeId, createdAt ?? null, finishedAt ?? null, complete ?? null, content ?? null, id]
    );

    if (rows.length === 0) return res.status(404).json({ error: "Task not found or already deleted" });

    // Dodaj naziv tipa u rezultat
    const task = rows[0];
    if (typeId !== null) {
      task.type = type;
    } else {
      // Ako tip nije menjan, treba dohvatiti naziv tipa iz baze
      const { rows: typeRows } = await pool.query("SELECT name FROM types WHERE id = $1", [task.type_id]);
      task.type = typeRows.length > 0 ? typeRows[0].name : null;
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    if (error.message.startsWith("Invalid task type")) {
      return res.status(400).json({ error: error.message });
    }
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
      `UPDATE tasks SET deleted_at = NULL, updated_at = NOW() 
       WHERE id = $1 AND deleted_at IS NOT NULL 
       RETURNING id, title, created_at, finished_at, complete, updated_at, content, type_id`,
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Task not found in trash" });

    // Dodaj naziv tipa u rezultat
    const task = rows[0];
    const { rows: typeRows } = await pool.query("SELECT name FROM types WHERE id = $1", [task.type_id]);
    task.type = typeRows.length > 0 ? typeRows[0].name : null;

    res.status(200).json({ message: "Task restored successfully", task });
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