const axios = require('axios');

const enviarTextoIA = async (texto) => {
  try {
    const response = await axios.post(process.env.CLASSIFIER_URL, { texto });
    return response.data.area || 'General';
  } catch (error) {
    console.error('[IA Classifier Error]', error.message);
    return 'General';
  }
};

module.exports = { enviarTextoIA };
