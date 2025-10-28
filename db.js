// db.js
const { Pool } = require("pg");

// Crear pool de conexiones usando la variable del entorno
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // necesario para Supabase
  }
});

module.exports = pool;
