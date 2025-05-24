const axios = require('axios');

const sendToAI = async (texto) => {
  try {
    const response = await axios.post('http://ia-classifier:6000/classify', { texto }); // 👈 Asegúrate de enviar { texto }
    return response.data.area;
  } catch (error) {
    console.error('Error en ia-classifier-client:', error.response?.data || error.message);
    return 'Error al clasificar el documento';
  }
};

module.exports = { sendToAI };
