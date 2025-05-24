const axios = require('axios');

const sendToDistribution = async (area, texto, filename) => {
  try {
    const response = await axios.post('http://localhost:7000/distribute', {
      area,
      texto,
      filename
    });
    return response.data;
  } catch (error) {
    console.error('Error en Distribution Service:', error.response?.data || error.message);
    return { success: false, error: 'Fallo en distribución del documento' };
  }
};

module.exports = { sendToDistribution };
