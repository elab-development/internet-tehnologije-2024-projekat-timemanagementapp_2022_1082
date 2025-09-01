import pkg from "pg";
const { Pool } = pkg;

// Pool koristi DATABASE_URL iz .env preko process.env 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // kompatibilno sa Neon TLS
});

// Prosta provera konekcije (poziva se iz index.js pri startu)
async function verifyConnection() {
  const { rows } = await pool.query("SELECT NOW() AS now");
  return rows[0].now;
}

// ES module export
export { pool, verifyConnection };
