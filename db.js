const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    require: true,
    rejectUnauthorized: false
  },
  // 👇 fuerza IPv4
  connectionTimeoutMillis: 5000,
  keepAlive: true
});

// Forzar uso de IPv4 en DNS
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

db.connect()
  .then(() => console.log('✅ Conectado a Supabase PostgreSQL (forzado IPv4)'))
  .catch(err => console.error('❌ Error al conectar:', err.message));

module.exports = db;
