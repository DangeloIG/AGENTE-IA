const { sendToAI } = require('./iaService');

const handleClassification = async (req, res) => {
  try {
    const { texto } = req.body;
    if (!texto) return res.status(400).json({ error: 'Texto requerido' });

    const area = await sendToAI(texto);
    res.json({ area });
  } catch (error) {
    console.error('Error en IA Classifier:', error);
    res.status(500).json({ error: 'Error clasificando el texto' });
  }
};

module.exports = { handleClassification };
