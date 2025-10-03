const express = require('express');
const router = express.Router();
const Endereco = require('../models/Endereco');
const { validaDadosEndereco } = require('../middlewares/enderecoMiddleware');

router.get('/', async (req, res) => {
  const enderecos = await Endereco.findAll({ order: [['id', 'ASC']] });
  res.render('enderecos', { enderecos });
});

router.get('/novo', (req, res) => {
  res.render('novo-endereco');
});

router.post('/add', validaDadosEndereco, async (req, res) => {
  try {
    const { rua, numero, bairro, cidade, estado, cep } = req.body;
    await Endereco.create({ rua, numero, bairro, cidade, estado: estado.toUpperCase(), cep });
    res.redirect('/enderecos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar endereço.');
  }
});

router.get('/editar/:id', async (req, res) => {
  const { id } = req.params;
  const endereco = await Endereco.findByPk(id);
  if (!endereco) return res.status(404).send('Endereço não encontrado.');
  res.render('editar-endereco', { endereco });
});

router.post('/editar/:id', validaDadosEndereco, async (req, res) => {
  try {
    const { id } = req.params;
    const { rua, numero, bairro, cidade, estado, cep } = req.body;
    const endereco = await Endereco.findByPk(id);
    if (!endereco) return res.status(404).send('Endereço não encontrado.');

    await endereco.update({ rua, numero, bairro, cidade, estado: estado.toUpperCase(), cep });
    res.redirect('/enderecos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao atualizar endereço.');
  }
});

router.post('/deletar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const endereco = await Endereco.findByPk(id);
    if (!endereco) return res.status(404).send('Endereço não encontrado.');
    await endereco.destroy();
    res.redirect('/enderecos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao deletar endereço.');
  }
});

module.exports = router;
