const Tesseract = require('tesseract.js');
const pdfParse = require('pdf-parse');
const fs = require('fs');

const extractText = async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'Archivo no recibido' });

    const filePath = file.path;

    if (file.mimetype === 'application/pdf') {
      const buffer = fs.readFileSync(filePath);
      const data = await pdfParse(buffer);
      res.json({ texto: data.text });
    } else {
      const result = await Tesseract.recognize(filePath, 'eng');
      res.json({ texto: result.data.text });
    }

  } catch (error) {
    console.error('Error OCR:', error);
    res.status(500).json({ error: 'Error leyendo el documento' });
  }
};

module.exports = { extractText };
