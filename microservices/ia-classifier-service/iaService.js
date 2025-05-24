const axios = require('axios');

const sendToAI = async (text) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          { role: 'system', content: 'Eres un asistente que decide a qué área municipal pertenece un documento escaneado. Responde solo con: Tecnología, Contabilidad, Logística o RR.HH.' },
          { role: 'user', content: text }
        ],
        temperature: 0.5
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://mi-portafolio.com',
          'X-Title': 'Agente IA Municipal'
        }
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error en OpenRouter:', error.response?.data || error.message);
    return 'Error al contactar con la IA';
  }
};

module.exports = { sendToAI };
