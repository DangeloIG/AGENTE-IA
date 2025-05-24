const path = require('path');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const { sendToAI } = require('../services/ia-classifier-client');
const { sendToDistribution } = require('../services/distributionService');

const handleUpload = async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileName = req.file.filename;

    const formData = new FormData();
    formData.append('document', fs.createReadStream(filePath));

    const ocrResponse = await axios.post('http://ocr-service:4000/ocr', formData, {
      headers: formData.getHeaders()
    });

    const texto = ocrResponse.data.texto;
    const area = await sendToAI(texto);
    const result = await sendToDistribution(area, texto, fileName);

    res.json({
      area,
      textoDetectado: texto,
      distribucion: result
    });
  } catch (error) {
    console.error("Error en el flujo completo:", error.message);
    res.status(500).json({ error: "Error procesando el documento" });
  }
};

module.exports = { handleUpload };
