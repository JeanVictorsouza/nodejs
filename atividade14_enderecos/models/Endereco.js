const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Endereco = sequelize.define('Endereco', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rua: {
    type: DataTypes.STRING(120),
    allowNull: false,
    validate: { notEmpty: true }
  },
  numero: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  bairro: {
    type: DataTypes.STRING(80),
    allowNull: false,
    validate: { notEmpty: true }
  },
  cidade: {
    type: DataTypes.STRING(80),
    allowNull: false,
    validate: { notEmpty: true }
  },
  estado: {
    type: DataTypes.STRING(2),
    allowNull: false,
    validate: { notEmpty: true, len: [2,2] }
  },
  cep: {
    type: DataTypes.STRING(9),
    allowNull: false,
    validate: { notEmpty: true }
  }
}, {
  tableName: 'enderecos',
  timestamps: true
});

module.exports = Endereco;
