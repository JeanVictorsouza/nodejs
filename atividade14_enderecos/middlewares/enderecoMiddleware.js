function validaDadosEndereco(req, res, next) {
  const { rua, bairro, cidade, estado, cep } = req.body || {};

  const faltando = [];
  if (!rua || !rua.trim()) faltando.push('rua');
  if (!bairro || !bairro.trim()) faltando.push('bairro');
  if (!cidade || !cidade.trim()) faltando.push('cidade');
  if (!estado || !estado.trim()) faltando.push('estado');
  if (!cep || !cep.trim()) faltando.push('cep');

  if (faltando.length > 0) {
    return res.status(400).send(`Todos os campos obrigatórios devem ser preenchidos: ${faltando.join(', ')}.`);
  }

  if (String(estado).length !== 2) {
    return res.status(400).send('O campo "estado" deve conter exatamente 2 caracteres (ex: MG, SP).');
  }

  const cepRegex = /^\d{5}-\d{3}$/;
  if (!cepRegex.test(cep)) {
    return res.status(400).send('O campo "cep" deve estar no formato 99999-999.');
  }

  return next();
}

module.exports = { validaDadosEndereco };
