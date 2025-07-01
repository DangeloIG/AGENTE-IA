const fs = require('fs');
const path = require('path');

const handleDistribution = async (req, res) => {
  try {
    const { area, filename } = req.body;
    if (!area || !filename) return res.status(400).json({ error: 'Área y filename requeridos' });

    // ✅ Normaliza el nombre del área para usarlo como carpeta segura
    const safeAreaName = area.toLowerCase().replace(/\s+/g, '_').replace(/[^\w\-]/g, '');

    // ✅ Rutas corregidas según volumen real compartido en Docker
    const sourcePath = path.join(__dirname, 'uploads', filename);
    const destDir = path.join(__dirname, 'uploads', safeAreaName);

    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    const destPath = path.join(destDir, filename);
    fs.renameSync(sourcePath, destPath);

    res.json({ message: `Documento movido a ${safeAreaName}` });
  } catch (error) {
    console.error('Error en Distribution Service:', error);
    res.status(500).json({ error: 'Error moviendo el documento' });
  }
};

module.exports = { handleDistribution };
