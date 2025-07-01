const { pool } = require('./db');

const generarExpediente = async () => {
  const result = await pool.query('SELECT COUNT(*) FROM documentos_confirmados');
  const count = parseInt(result.rows[0].count) + 1;
  return count.toString().padStart(4, '0'); // "0001", "0002", etc.
};

module.exports = { generarExpediente };
