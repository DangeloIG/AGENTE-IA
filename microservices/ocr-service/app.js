const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { extractText } = require('./ocrController');

const app = express();
const PORT = process.env.PORT || 4000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());

app.post('/ocr', upload.single('document'), extractText);

app.listen(PORT, () => {
  console.log(`OCR Service corriendo en http://localhost:${PORT}`);
});
