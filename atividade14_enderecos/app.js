require('dotenv').config();
const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const Endereco = require('./models/Endereco'); 
const enderecosRoutes = require('./routes/enderecosRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.redirect('/enderecos'));
app.use('/enderecos', enderecosRoutes);

const PORT = process.env.PORT || 3000;

// Sincroniza o schema no banco SQL definido nas variáveis de ambiente
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao sincronizar com o banco:', err);
});
