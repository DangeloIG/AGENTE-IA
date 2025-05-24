const axios = require('axios');

const enviarDistribucion = async (area, texto, filename) => {
  try {
    const response = await axios.post(process.env.DISTRIBUTION_URL, {
      area, texto, filename
    });
    return response.data;
  } catch (error) {
    console.error('[Routing Error]', error.message);
    return { success: false };
  }
};

module.exports = { enviarDistribucion };
