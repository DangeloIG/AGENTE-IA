const express = require('express');
const cors = require('cors');
const { handleDistribution } = require('./distributionController');

const app = express();
const PORT = 7000;

app.use(cors());
app.use(express.json());

app.post('/distribute', handleDistribution);

app.listen(PORT, () => {
  console.log(`Distribution Service corriendo en http://localhost:${PORT}`);
});
