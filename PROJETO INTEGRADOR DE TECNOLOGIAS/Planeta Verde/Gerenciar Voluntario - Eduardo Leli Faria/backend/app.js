const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');
const path = require('path'); // Adicione esta linha

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar CORS
app.use(cors());

// Servir arquivos estáticos da pasta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rota para acessar o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Rota para cadastrar voluntário
app.post('/cadastrar', (req, res) => {
  const { nome, cpf, email, endereco } = req.body;
  const query = 'INSERT INTO voluntarios (nome, cpf, email, endereco) VALUES (?, ?, ?, ?)';

  db.query(query, [nome, cpf, email, endereco], (err, result) => {
    if (err) {
      return res.status(500).send('cadastrando voluntário');
    }
    res.status(200).send('Voluntário cadastrado com sucesso');
  });
});

// Rota para buscar voluntários
app.get('/buscar', (req, res) => {
  const searchTerm = req.query.searchTerm || '';
  const query = `SELECT * FROM voluntarios WHERE nome LIKE ? OR cpf LIKE ? OR email LIKE ?`;

  db.query(query, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar voluntários');
    }
    res.status(200).json(results);
  });
});

// Rota para buscar voluntário por ID (editar)
app.get('/buscar/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM voluntarios WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar voluntário');
    }
    if (results.length === 0) {
      return res.status(404).send('Voluntário não encontrado');
    }
    res.status(200).json(results[0]);
  });
});

// Rota para editar voluntário
app.put('/editar/:id', (req, res) => {
  const { id } = req.params;
  const { nome, cpf, email, endereco } = req.body;
  const query = 'UPDATE voluntarios SET nome = ?, cpf = ?, email = ?, endereco = ? WHERE id = ?';

  db.query(query, [nome, cpf, email, endereco, id], (err, result) => {
    if (err) {
      return res.status(500).send('Voluntário atualizado com sucesso');
    }
    res.status(200).send('Voluntário atualizado com sucesso');
  });
});

// Rota para excluir voluntário
app.delete('/excluir/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM voluntarios WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao excluir voluntário');
    }
    res.status(200).send('Voluntário excluído com sucesso');
  });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
