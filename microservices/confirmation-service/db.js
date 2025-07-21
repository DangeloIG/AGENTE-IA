// microservices/confirmation-service/db.js

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/**
 * Guarda un documento confirmado.
 * @param {string} area
 * @param {string} filename
 * @param {string} jefe
 * @param {Date} fecha
 * @param {string} expediente
 */
async function guardarDocumento(area, filename, jefe, fecha, expediente) {
  const query = `
    INSERT INTO documentos_confirmados
      (area, filename, jefe, fecha, expediente)
    VALUES ($1, $2, $3, $4, $5)
  `;
  await pool.query(query, [area, filename, jefe, fecha, expediente]);
}

module.exports = {
  pool,
  guardarDocumento
};
