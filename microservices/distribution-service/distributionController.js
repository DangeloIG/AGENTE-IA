const fs = require('fs');
const path = require('path');

const handleDistribution = async (req, res) => {
  try {
    const { area, filename } = req.body;
    if (!area || !filename) return res.status(400).json({ error: 'Área y filename requeridos' });

    const sourcePath = path.join(__dirname, '..', '..', 'backend', 'uploads', filename);
    const destDir = path.join(__dirname, '..', '..', 'backend', 'uploads', area.toLowerCase());

    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    const destPath = path.join(destDir, filename);
    fs.renameSync(sourcePath, destPath);

    res.json({ message: `Documento movido a ${area}` });
  } catch (error) {
    console.error('Error en Distribution Service:', error);
    res.status(500).json({ error: 'Error moviendo el documento' });
  }
};

module.exports = { handleDistribution };
