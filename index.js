const express = require('express');
const Ajv = require('ajv');

const app = express();
app.use(express.json());

const ajv = new Ajv();

const productSchema = {
  type: 'object',
  properties: {
    nome: { type: 'string' },
    descricao: { type: 'string' },
    preco: { type: 'number' },
  },
  required: ['nome', 'preco'],
};

app.post('/produto', validateProduct, (req, res) => {

  res.send('Produto adicionado com sucesso!');
});

function validateProduct(req, res, next) {
  const valid = ajv.validate(productSchema, req.body);
  if (!valid) {
    return res.status(400).send(ajv.errors);
  }
}

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
