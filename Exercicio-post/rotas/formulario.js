module.exports = (req, res, dados) => {
  const valor = parseFloat(dados.valor);
  const moeda = dados.moeda;

  if (isNaN(valor) || !moeda) {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Dados inválidos.");
    return;
  }

  let taxa = 0;
  if (moeda === "USD") taxa = 5.45;
  else if (moeda === "EUR") taxa = 6.35;
  else {
    res.writeHead(400, { "Content-Type": "text/plain;charset=utf-8" });
    res.end("Moeda não suportada.");
    return;
  }

  const convertido = (valor * taxa).toFixed(2);

  res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
  res.end(`${valor} ${moeda} equivalem a R$ ${convertido}`);
};
