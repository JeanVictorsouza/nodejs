const express = require("express");
const router = express.Router();
const Produto = require("../models/Produto");

// 1. Importa o middleware de validação
const { validaDadosProduto } = require("../middlewares/produtoMiddleware");

// ROTA PARA LISTAR TODOS OS PRODUTOS (READ)
router.get("/", async (req, res) => {
  const produtos = await Produto.findAll({ order: [["id", "DESC"]] });
  res.render("produtos", { produtos });
});

// ROTA PARA EXIBIR O FORMULÁRIO DE CADASTRO
router.get("/novo", (req, res) => {
  res.render("novo-produto");
});

// ROTA PARA SALVAR UM NOVO PRODUTO (CREATE)
router.post("/add", validaDadosProduto, async (req, res) => {
  // Se o código chegou aqui, os dados já foram validados pelo middleware
  const { nome, descricao, preco, quantidade } = req.body;
  await Produto.create({ nome, descricao, preco, quantidade });
  res.redirect("/produtos");
});

// ROTA PARA EXIBIR O FORMULÁRIO DE EDIÇÃO
router.get("/editar/:id", async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  res.render("editar-produto", { produto });
});

// ROTA PARA ATUALIZAR UM PRODUTO (UPDATE)
router.post("/editar/:id", validaDadosProduto, async (req, res) => {
  const { nome, descricao, preco, quantidade } = req.body;
  await Produto.update(
    { nome, descricao, preco, quantidade },
    { where: { id: req.params.id } }
  );
  res.redirect("/produtos");
});

// ROTA PARA DELETAR UM PRODUTO (DELETE)
router.post("/deletar/:id", async (req, res) => {
  await Produto.destroy({ where: { id: req.params.id } });
  res.redirect("/produtos");
});

module.exports = router;
