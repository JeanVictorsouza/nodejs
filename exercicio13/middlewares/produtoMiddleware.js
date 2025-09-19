const Produto = require("../models/Produto"); // Importamos o Model do Sequelize

// Middleware para validar os dados do corpo da requisição
const validaDadosProduto = (req, res, next) => {
  const { nome, preco, quantidade } = req.body;
  // 1. Validação de campos vazios
  if (!nome || !preco || !quantidade) {
    return res.status(400).send("Nome, preço e quantidade são obrigatórios.");
  }
  // 2. Validação de tipos e valores
  if (isNaN(preco) || Number(preco) < 0) {
    return res.status(400).send("O preço deve ser um número positivo.");
  }
  if (
    isNaN(quantidade) ||
    !Number.isInteger(Number(quantidade)) ||
    Number(quantidade) < 0
  ) {
    return res
      .status(400)
      .send("A quantidade deve ser um número inteiro e positivo.");
  }
  // 3. Se tudo estiver correto, passa para a próxima função (a rota)
  next();
};

module.exports = {
  validaDadosProduto,
};
