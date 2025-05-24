const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const extractText = async (filePath) => {
  const form = new FormData();
  form.append('document', fs.createReadStream(filePath));

  const response = await axios.post('http://ocr-service:4000/ocr', form, {
    headers: form.getHeaders()
  });

  return response.data.texto;
};

module.exports = { extractText };
