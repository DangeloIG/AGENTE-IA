require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const { sequelize } = require('./models');
const documentRoutes = require('./routes/document.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Ruta test opcional
app.get('/', (req, res) => res.send('✅ Document-service activo'));

// Rutas
app.use('/api/documentos', documentRoutes);
app.use(errorHandler);

// Iniciar con reintento a DB
const iniciarServidor = async () => {
  let conectado = false;
  const intentosMaximos = 10;
  let intentos = 0;

  console.log('📦 CONFIG DB:', {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    PORT: process.env.DB_PORT,
  });

  while (!conectado && intentos < intentosMaximos) {
    try {
      await sequelize.authenticate();
      console.log('✅ Conexión a base de datos establecida');
      conectado = true;
    } catch (err) {
      intentos++;
      console.log(`⏳ Intentando conectar a la base de datos... (${intentos}/${intentosMaximos})`);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  if (!conectado) {
    console.error('❌ No se pudo conectar a la base de datos después de varios intentos.');
    process.exit(1);
  }

  await sequelize.sync({ alter: true }); // Solo aquí

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

iniciarServidor();
