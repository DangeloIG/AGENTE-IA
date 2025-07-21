const axios = require('axios');

const sendToAI = async (text) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          { role: 'system', content: `Eres un clasificador de documentos. Tu única tarea es determinar a qué área de la Municipalidad Distrital de Pueblo Nuevo - Ica pertenece un documento escaneado. Si es una imagen analizala de tal manera que extraigas el texto para que puedas deducir a qué área pertenece.

Responde con UNA sola palabra: Tecnologia, Contabilidad, Logistica, RR.HH., o Rechazar.

Solo responde "Rechazar" si:
- El documento no está dirigido a la municipalidad de Pueblo Nuevo - Ica
- Menciona otra ciudad (Chincha, Pisco, etc.)
- O no tiene relación con trámites municipales (ej: listas, currículums, textos genéricos)

No escribas nada más. Sin explicaciones, sin repetir. Solo una palabra en mayúsculas iniciales.`
  },
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
