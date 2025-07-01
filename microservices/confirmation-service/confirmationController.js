const { pool } = require('./db');
const { generarExpediente } = require('./expedienteHelper');

const handleConfirmation = async (req, res) => {
  const { area, filename, decision, jefe } = req.body;

  if (!area || !filename || !decision || !jefe)
    return res.status(400).json({ error: 'Faltan campos requeridos' });

  if (decision.toLowerCase() === 'sí' || decision.toLowerCase() === 'si') {
    try {
      const expediente = await generarExpediente();
      const fecha = new Date();

      await pool.query(
        'INSERT INTO documentos_confirmados (area, filename, jefe, fecha, expediente) VALUES ($1, $2, $3, $4, $5)',
        [area, filename, jefe, fecha, expediente]
      );

      return res.json({
        success: true,
        message: `Documento confirmado y guardado con expediente ${expediente}`
      });
    } catch (err) {
      console.error('Error al guardar en PostgreSQL:', err);
      return res.status(500).json({ error: 'Error guardando en base de datos' });
    }
  }

  return res.json({
    success: true,
    message: 'Documento rechazado. Enviado a reclasificación'
  });
};

module.exports = { handleConfirmation };
