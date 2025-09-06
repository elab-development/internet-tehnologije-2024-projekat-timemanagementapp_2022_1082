import { pool } from "../config/db.js";

export async function getAllTypes(req, res) {
  try {
    const { rows } = await pool.query("SELECT id, name FROM types ORDER BY id ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching types:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}