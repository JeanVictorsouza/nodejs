module.exports = (req, res, query) => {
  const numero = parseFloat(query.numero);
  if (isNaN(numero)) {
    res.writeHead(400, { "Content-Type": "text/plain;charset=utf-8" });
    res.end("Número inválido.");
    return;
  }
  res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
  res.end(`O dobro de ${numero} é ${numero * 2}.`);
};
