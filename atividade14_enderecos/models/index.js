require('dotenv').config();
const { Sequelize } = require('sequelize');

const dialect = process.env.DB_DIALECT || 'mysql'; // 'mysql' | 'postgres'
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : (dialect === 'postgres' ? 5432 : 3306);
const database = process.env.DB_NAME || 'atividade14';
const username = process.env.DB_USER || 'root';
const password = process.env.DB_PASS || '';

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
  logging: false,
  dialectOptions: dialect === 'postgres' ? {} : {},
  define: {
    freezeTableName: false
  }
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco estabelecida com sucesso.');
  } catch (error) {
    console.error('❌ Não foi possível conectar ao banco:', error.message);
  }
}

testConnection();

module.exports = { sequelize };
