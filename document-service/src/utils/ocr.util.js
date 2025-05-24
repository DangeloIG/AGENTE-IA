const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { convertirPdfAEImagen } = require('./pdf.util');

const extraerTextoOCR = async (ruta) => {
  const extension = path.extname(ruta).toLowerCase();

  if (extension === '.pdf') {
    const buffer = fs.readFileSync(ruta);
    const data = await pdfParse(buffer);
    const texto = data.text.trim();

    if (texto.length > 20) {
      return texto;
    }

    console.log('[PDF sin texto: convirtiendo a imagen para OCR]');
    const imagenRuta = await convertirPdfAEImagen(ruta);
    return await procesarOCR(imagenRuta);
  }

  // Si es imagen directamente
  return await procesarOCR(ruta);
};

const procesarOCR = async (rutaImagen) => {
  const { data: { text } } = await Tesseract.recognize(rutaImagen, 'spa', {
    logger: m => console.log('[OCR]', m.status, m.progress)
  });
  return text.trim();
};

module.exports = { extraerTextoOCR };
