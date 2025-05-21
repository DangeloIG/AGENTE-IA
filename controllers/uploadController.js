const path = require('path');
const { extractText } = require('../services/ocrService');
const { sendToAI } = require('../services/iaService');

const handleUpload = async (req, res) => {
  try {
    const filePath = req.file.path;
    const texto = await extractText(filePath);
    const area = await sendToAI(texto);

    res.json({
      area,
      textoDetectado: texto
    });
  } catch (error) {
    console.error("Error en uploadController:", error);
    res.status(500).json({ error: "Error procesando el documento." });
  }
};

module.exports = { handleUpload };
