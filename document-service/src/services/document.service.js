const fs = require('fs');
const path = require('path');
const { extraerTextoOCR } = require('../utils/ocr.util');
const { generarExpediente } = require('../utils/expediente.util');
const { enviarTextoIA } = require('./classification.service');
const { enviarDistribucion } = require('./routing.service');
const { Document } = require('../models');

const procesarDocumento = async (archivo, datos) => {
  if (!archivo) throw new Error('No se recibió ningún archivo');

  const ruta = archivo.path;
  const nombre = archivo.originalname;
  const asunto = datos.asunto || 'Sin asunto';
  const descripcion = datos.descripcion || '';

  const texto = await extraerTextoOCR(ruta);
  const expediente = generarExpediente();
  const area = await enviarTextoIA(texto);
  const distribucion = await enviarDistribucion(area, texto, nombre);

  // Guardar en base de datos
  const nuevoDoc = await Document.create({
    expediente,
    asunto,
    descripcion,
    texto,
    area,
    archivo: nombre
  });

  // Eliminar archivo temporal
  fs.unlinkSync(ruta);

  return {
    mensaje: 'Documento procesado exitosamente',
    documento: nuevoDoc,
    distribucion
  };
};

module.exports = { procesarDocumento };
