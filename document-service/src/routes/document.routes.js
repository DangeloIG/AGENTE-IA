const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const documentController = require('../controllers/document.controller');
const { validarDocumento } = require('../middlewares/validateDocument');

// Configurar almacenamiento de archivos con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', '..', 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Rutas
router.post(
  '/',
  upload.single('document'),  // Para recibir un solo archivo en el campo "document"
  validarDocumento,           // Validar campo asunto
  documentController.handleUpload
);

module.exports = router;
