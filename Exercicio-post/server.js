const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");

// importando as rotas
const saudacao = require("./rotas/saudacao");
const dobro = require("./rotas/dobro");
const formulario = require("./rotas/formulario");
const soma = require("./rotas/soma");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === "GET" && parsedUrl.pathname === "/") {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain;charset=utf-8" });
        res.end("Erro interno no servidor");
      } else {
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.end(data);
      }
    });
  }

  // GET saudacao
  else if (req.method === "GET" && parsedUrl.pathname === "/saudacao") {
    saudacao(req, res, parsedUrl.query);
  }

  // GET dobro
  else if (req.method === "GET" && parsedUrl.pathname === "/dobro") {
    dobro(req, res, parsedUrl.query);
  }

  // POST formulario
  else if (req.method === "POST" && parsedUrl.pathname === "/formulario") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      const dados = querystring.parse(body);
      formulario(req, res, dados);
    });
  }

  // POST soma
  else if (req.method === "POST" && parsedUrl.pathname === "/soma") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      const dados = querystring.parse(body);
      soma(req, res, dados);
    });
  }

  // rota nao encontrada
  else {
    res.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
    res.end("Rota não encontrada");
  }
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
