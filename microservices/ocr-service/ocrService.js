const Tesseract = require('tesseract.js');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const extractText = async (filePath) => {
  if (filePath.toLowerCase().endsWith('.pdf')) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } else {
    const result = await Tesseract.recognize(filePath, 'eng');
    return result.data.text;
  }
};

module.exports = { extractText };
