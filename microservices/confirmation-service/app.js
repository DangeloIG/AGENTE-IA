const express = require('express');
const bodyParser = require('body-parser');
const { guardarDocumento } = require('./db'); // 👈 Import correcto

const app = express();
app.use(bodyParser.json());

let secuencia = 1; // esto se puede mejorar luego con consulta a la BD

app.post('/confirmar', async (req, res) => {
  const { area, textoDetectado, decision, jefe } = req.body;

  if (decision === 'Sí') {
    const expediente = String(secuencia).padStart(4, '0');
    const fecha = new Date();

    await guardarDocumento(area, textoDetectado, jefe, expediente, fecha);
    secuencia++;

    return res.json({
      confirmado: true,
      mensaje: 'Documento confirmado y guardado en la base de datos',
      expediente
    });
  } else {
    return res.json({
      confirmado: false,
      mensaje: 'Documento rechazado por el jefe'
    });
  }
});

app.listen(8000, () => console.log('Confirmation service running on port 8000'));
