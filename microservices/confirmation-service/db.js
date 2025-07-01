const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function guardarDocumento(area, texto, jefe, expediente, fecha) {
  const query = `
    INSERT INTO documentos_confirmados (area, texto_detectado, jefe, expediente, fecha_confirmacion)
    VALUES ($1, $2, $3, $4, $5)
  `;
  await pool.query(query, [area, texto, jefe, expediente, fecha]);
}

module.exports = {
  pool,
  guardarDocumento
};
