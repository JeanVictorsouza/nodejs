require("dotenv").config();
const express = require("express");
const sequelize = require("./db");

// Importar Models e Rotas
const Produto = require("./models/Produto");
const produtosRoutes = require("./routes/produtosRoutes");

const app = express();
const port = 3000;

// Configurações do Express
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));

// Rota principal redireciona para a lista de produtos
app.get("/", (req, res) => {
  res.redirect("/produtos");
});

// Monta as rotas de produtos
app.use("/produtos", produtosRoutes);

// Sincroniza o banco e inicia o servidor
sequelize
  .sync()
  .then(() => {
    console.log("Tabelas sincronizadas com sucesso.");
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao sincronizar as tabelas:", error);
  });
