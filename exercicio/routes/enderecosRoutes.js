const express = require("express");
const router = express.Router();
const Produto = require("../models/Endereco");

// 1. Importa o middleware de validação
const { validaDadosProduto } = require("../middlewares/enderecoMiddleware");

// ROTA PARA LISTAR TODOS OS endereco (READ)
router.get("/", async (req, res) => {
  const produtos = await Produto.findAll({ order: [["id", "DESC"]] });
  res.render("endereco", { endereco });
});

// ROTA PARA EXIBIR O FORMULÁRIO DE CADASTRO endereco
router.get("/novo", (req, res) => {
  res.render("novo-endereco");
});

// ROTA PARA SALVAR UM NOVO endereco (CREATE)
router.post("/add", validaDadosEndereco, async (req, res) => {
  // Se o código chegou aqui, os dados já foram validados pelo middleware
  const { nome, descricao, preco, quantidade } = req.body;
  await Produto.create({ id, rua, numero, bairro, cidade, estado, cep });
  res.redirect("/endereco");
});

// ROTA PARA EXIBIR O FORMULÁRIO DE EDIÇÃO
router.get("/editar/:id", async (req, res) => {
  const endereco = await endereco.findByPk(req.params.id);
  res.render("editar-endereco", { endereco });
});

// ROTA PARA ATUALIZAR UM endereco (UPDATE)
router.post("/editar/:id", validaDadosProduto, async (req, res) => {
  const { id, rua, numero, bairro, cidade, estado, cep } = req.body;
  await Produto.update(
    { id, rua, numero, bairro, cidade, estado, cep },
    { where: { id: req.params.id } }
  );
  res.redirect("/endereco");
});

// ROTA PARA DELETAR UM endereco (DELETE)
router.post("/deletar/:id", async (req, res) => {
  await endereco.destroy({ where: { id: req.params.id } });
  res.redirect("/endereco");
});

module.exports = router;
