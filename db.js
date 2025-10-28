// db.js
import pg from "pg";
const { Pool } = pg;

// Crear el pool de conexiones usando la variable de entorno de Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // necesario para conexiones seguras en Supabase
  }
});

export default pool;
