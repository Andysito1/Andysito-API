const dns = require('dns');

const { Pool } = require('pg');
require('dotenv').config();
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

// Usa una sola variable de conexión completa
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { require: true, rejectUnauthorized: false }
});

db.connect()
  .then(() => console.log('✅ Conectado a Supabase PostgreSQL'))
  .catch(err => console.error('❌ Error al conectar:', err.message));

module.exports = db;

