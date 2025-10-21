// init-db.js
require('dotenv').config();
const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Cambia la ruta del archivo SQL si es necesario
const sqlFilePath = './schema.sql'; // por ejemplo, tu archivo con tablas y datos

async function initDB() {
  try {
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    console.log('📥 Ejecutando script SQL...');
    await pool.query(sql);
    console.log('✅ Base de datos inicializada correctamente.');
  } catch (error) {
    console.error('❌ Error al ejecutar el script:', error);
  } finally {
    await pool.end();
  }
}

initDB();
