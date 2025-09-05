module.exports = (req, res, dados) => {
  const a = parseFloat(dados.a);
  const b = parseFloat(dados.b);

  if (isNaN(a) || isNaN(b)) {
    res.writeHead(400, { "Content-Type": "text/plain;charset=utf-8" });
    res.end("Parâmetros inválidos.");
    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
  res.end(`A soma de ${a} + ${b} é ${a + b}.`);
};
