import { pool } from "../config/db.js";

// User stats
export async function getUserStats(req, res) {
  try {
    // Statistika
    const totalTasksResult = await pool.query(
      "SELECT COUNT(*) as total FROM tasks WHERE deleted_at IS NULL"
    );
    
    const completedTasksResult = await pool.query(
      "SELECT COUNT(*) as completed FROM tasks WHERE deleted_at IS NULL AND complete = true"
    );
    
    const trashedTasksResult = await pool.query(
      "SELECT COUNT(*) as trashed FROM tasks WHERE deleted_at IS NOT NULL"
    );

    const recentTasksResult = await pool.query(
      "SELECT COUNT(*) as recent FROM tasks WHERE deleted_at IS NULL AND created_at >= NOW() - INTERVAL '7 days'"
    );
    
    const stats = {
      tasks: {
        total: parseInt(totalTasksResult.rows[0].total),
        completed: parseInt(completedTasksResult.rows[0].completed),
        pending: parseInt(totalTasksResult.rows[0].total) - parseInt(completedTasksResult.rows[0].completed),
        trashed: parseInt(trashedTasksResult.rows[0].trashed),
        recentlyCreated: parseInt(recentTasksResult.rows[0].recent)
      },
      productivity: {
        completionRate: totalTasksResult.rows[0].total > 0 
          ? Math.round((completedTasksResult.rows[0].completed / totalTasksResult.rows[0].total) * 100)
          : 0
      }
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}