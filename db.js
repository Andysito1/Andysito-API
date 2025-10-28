// db.js
const { Pool } = require("pg");
require("dotenv").config();

// Crear un pool de conexiones a Supabase PostgreSQL
const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { require: true, rejectUnauthorized: false } // obligatorio para Render + Supabase
});

// Verificar conexión
db.connect()
  .then(() => console.log("Conectado a la base de datos Supabase"))
  .catch((err) => console.error("Error al conectar:", err.message));

module.exports = db;
