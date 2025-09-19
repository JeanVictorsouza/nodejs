const express = require("express");
const router = express.Router();
const pool = require("../db");
const {
  buscaClientePorId,
  buscaTodosClientes,
  validaDadosCliente,
} = require("../middlewares/clienteMiddleware");

router.get("/", buscaTodosClientes, (req, res) => {
  res.render("cliente");
});

router.get("/novo", (req, res) => {
  res.render("novo-cliente");
});

router.post("/add", validaDadosCliente, async (req, res) => {
  const { nome, email } = req.body;
  try {
    await pool.query("INSERT INTO clientes (nome, email) VALUES (?, ?)", [
      nome,
      email,
    ]);
    res.redirect("/cliente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao inserir cliente.");
  }
});

router.get("/detalhe/:id", buscaClientePorId, (req, res) => {
  res.render("detalhe-cliente");
});

module.exports = router;
