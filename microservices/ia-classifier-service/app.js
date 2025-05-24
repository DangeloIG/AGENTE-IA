const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { handleClassification } = require('./iaController');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

app.post('/classify', handleClassification);

app.listen(PORT, () => {
  console.log(`IA Classifier corriendo en http://localhost:${PORT}`);
});

process.on('uncaughtException', err => {
  console.error('Excepción no controlada:', err);
});
