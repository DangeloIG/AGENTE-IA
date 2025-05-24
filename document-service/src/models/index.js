const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: 'postgres',
    logging: false,
  }
);

// Importar modelos
const Document = require('./document.model')(sequelize);

module.exports = {
  sequelize,
  Document,
};
