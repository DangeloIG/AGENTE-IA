const axios = require('axios');
require('dotenv').config();

const sendToDify = async (text) => {
  try {
    const response = await axios.post(
      'https://api.dify.ai/v1/completion-messages',
      {
        inputs: { input: text },
        user: "backend-agentia",
        response_mode: 'blocking'
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DIFY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.answer || 'Área no detectada';
  } catch (error) {
    console.error('Error en Dify:', error.response?.data || error.message);
    return 'Error al contactar con la IA';
  }
};

module.exports = { sendToDify };
