// microservices/confirmation-service/app.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { guardarDocumento } = require('./db');

const app = express();
app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST', 'OPTIONS'], allowedHeaders: ['Content-Type'], }));             // ← Habilita CORS

app.use(bodyParser.json());

let secuencia = 1;

app.post('/confirmar', async (req, res) => {
  const { area, filename, decision, jefe } = req.body;

  const respuesta = decision
    ?.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (respuesta === 'si') {
    try {
      const expediente = String(secuencia).padStart(4, '0');
      const fecha = new Date();

      // Llamamos a guardarDocumento con los cinco campos en el orden correcto:
      // 1. area, 2. filename, 3. jefe, 4. fecha, 5. expediente
      await guardarDocumento(area, filename, jefe, fecha, expediente);

      secuencia++;
      return res.json({
        confirmado: true,
        mensaje: 'Documento confirmado y guardado en la base de datos',
        expediente
      });
    } catch (err) {
      console.error('❌ Error al guardar en PostgreSQL:', err);
      return res.status(500).json({ confirmado: false, error: 'Error al guardar en la base de datos' });
    }
  } else {
    return res.json({
      confirmado: false,
      mensaje: 'Documento rechazado por el jefe'
    });
  }
});

app.listen(8000, () => console.log('✅ Confirmation service running on port 8000'));
