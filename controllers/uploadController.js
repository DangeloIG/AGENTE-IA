const path = require('path');
const { extractText } = require('../services/ocrService');
const { sendToDify } = require('../services/difyService');

const handleUpload = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
    const text = await extractText(filePath);
    const area = await sendToDify(text);
    res.json({ area, textoDetectado: text });
  } catch (error) {
    console.error("Error en uploadController:", error);
    res.status(500).json({ error: 'Error procesando el documento.' });
  }
};

module.exports = { handleUpload };
