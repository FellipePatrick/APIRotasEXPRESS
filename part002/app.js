const express = require('express');
const bodyParser = require('body-parser');
const { verificarMelhorRota } = require('../part001/func');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let pedidos = [];
let rotas = [];

app.get('/pedidos', (req, res) => {
  res.send(pedidos);
});

app.post('/pedidos', (req, res) => {
  const { endereco, produto, quantidade } = req.body;
  const { latitude, longitude } = endereco;
  if (typeof latitude !== 'number' || typeof longitude !== 'number' || !produto || typeof quantidade !== 'number') {
    return res.status(400).send({ message: 'Dados inválidos' });
  }
  const novoPedido = { id: pedidos.length + 1, endereco: { latitude, longitude }, produto, quantidade };
  pedidos.push(novoPedido);
  res.status(201).send(novoPedido);
});

app.get('/rotas', (req, res) => {
  res.send(rotas);
});

app.post('/rotas', (req, res) => {
  const { latitude, longitude } = req.body;
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).send({ message: 'Dados inválidos' });
  }
  const novaRota = { id: rotas.length + 1, latitude, longitude };
  rotas.push(novaRota);
  res.status(201).send(novaRota);
});

app.post('/melhor-rota', (req, res) => {
  const { pedidos, rotas } = req.body;
  if (!Array.isArray(pedidos) || !Array.isArray(rotas)) {
    return res.status(400).send({ message: 'Dados inválidos' });
  }

  const melhorRota = verificarMelhorRota(pedidos, rotas);

  res.send(melhorRota ? { melhorRota } : { message: 'Nenhuma rota disponível' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
