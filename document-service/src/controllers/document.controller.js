const documentService = require('../services/document.service');

const handleUpload = async (req, res, next) => {
  try {
    const resultado = await documentService.procesarDocumento(req.file, req.body);
    res.status(201).json(resultado);
  } catch (error) {
    next(error); // Lo captura el errorHandler
  }
};

module.exports = { handleUpload };
