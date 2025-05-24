const path = require('path');
const { PdfConverter } = require('pdf-poppler');
const fs = require('fs');

const convertirPdfAEImagen = async (rutaPdf) => {
  const nombreSinExtension = path.basename(rutaPdf, path.extname(rutaPdf));
  const salidaDir = path.join(__dirname, '../../uploads/tmp');

  if (!fs.existsSync(salidaDir)) {
    fs.mkdirSync(salidaDir, { recursive: true });
  }

  const salidaBase = path.join(salidaDir, nombreSinExtension);
  const opciones = {
    format: 'png',
    out_dir: salidaDir,
    out_prefix: nombreSinExtension,
    page: 1
  };

  try {
    await PdfConverter.convert(rutaPdf, opciones);
    return `${salidaBase}-1.png`;
  } catch (err) {
    console.error('[Error al convertir PDF a imagen]', err);
    throw err;
  }
};

module.exports = { convertirPdfAEImagen };
