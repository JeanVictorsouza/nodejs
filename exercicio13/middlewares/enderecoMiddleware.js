const Produto = require("../models/Produto"); // Importamos o Model do Sequelize

// Middleware para validar os dados do corpo da requisição
const validaDadosEndereco = (req, res, next) => {
  const { rua, numero, bairro, cidade, estado, cep } = req.body;
  // 1. Validação de campos vazios
  if (!rua || !numero || !bairro || !cidade  || !estado || !cep) {
    return res.status(400).send("rua, numero, bairro, cidade, estado, cep são obrigatórios.");
  }
  // 2. Validação de tipos e valores
  if (isNaN(estado) || Number(preco) < 0) {
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
  validaDadosEndereco,
};
