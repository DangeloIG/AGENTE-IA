const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const documentController = require('../controllers/document.controller');
const { validarDocumento } = require('../middlewares/validateDocument');

// Configurar multer para subida
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', '..', 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// Rutas
router.post('/', upload.single('document'), validarDocumento, documentController.handleUpload);

module.exports = router;
