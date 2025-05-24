const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Document', {
    expediente: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    asunto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    texto: {
      type: DataTypes.TEXT,
    },
    area: {
      type: DataTypes.STRING,
    },
    archivo: {
      type: DataTypes.STRING,
    },
    fechaIngreso: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  });
};
