import { pool } from "../config/db.js";

// GET sve user-e (samo admin)
export async function getAllUsers(req, res) {
  try {
    const { rows } = await pool.query(
      "SELECT id, username, role, created_at, updated_at FROM users ORDER BY id ASC"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// POST napravi novog user-a (samo admin)
export async function createUser(req, res) {
  try {
    const { username, password, role = "user" } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const { rows } = await pool.query(
      `INSERT INTO users (username, password, role, created_at, updated_at)
       VALUES ($1, $2, $3, NOW(), NOW())
       RETURNING id, username, role, created_at, updated_at`,
      [username, password, role]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
