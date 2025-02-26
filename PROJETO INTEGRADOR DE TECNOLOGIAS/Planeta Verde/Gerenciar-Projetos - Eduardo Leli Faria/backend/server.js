const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000; // ou 4000, se preferir

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Altere para o usuário do seu banco
  password: '', // Adicione a senha do banco, se existir
  database: 'ecosys' // Nome do banco
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados!');
});

// Middleware para parsear JSON
app.use(bodyParser.json());

// Servindo o front-end (index.html dentro da pasta frontend)
app.use(express.static(path.join(__dirname, '../frontend'))); // Ajuste para a pasta frontend

// Rota para criar um novo projeto
app.post('/api/projetos', (req, res) => {
  const { nome, descricao, data_inicio, status } = req.body;
  const sql = `INSERT INTO projetos (nome, descricao, data_inicio, status) VALUES (?, ?, ?, ?)`;

  db.query(sql, [nome, descricao, data_inicio, status], (err, result) => {
    if (err) {
      console.error('Erro ao criar projeto:', err);
      res.status(500).send('Erro ao criar o projeto');
    } else {
      res.status(201).send('Projeto criado com sucesso');
    }
  });
});

// Rota para listar todos os projetos
app.get('/api/projetos', (req, res) => {
  const sql = `SELECT * FROM projetos`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao listar projetos:', err);
      res.status(500).send('Erro ao listar os projetos');
    } else {
      res.json(results);
    }
  });
});

// Rota para atualizar um projeto
app.put('/api/projetos/:id', (req, res) => {
  const id = req.params.id; // Id do projeto a ser atualizado
  const { nome, descricao, data_inicio, status } = req.body; // Dados recebidos no corpo da requisição

  const sql = `UPDATE projetos SET nome = ?, descricao = ?, data_inicio = ?, status = ? WHERE id = ?`;

  db.query(sql, [nome, descricao, data_inicio, status, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar projeto:', err);
      res.status(500).send('Erro ao atualizar o projeto');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Projeto não encontrado');
    } else {
      res.status(200).send('Projeto atualizado com sucesso');
    }
  });
});

// Rota para excluir um projeto
app.delete('/api/projetos/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM projetos WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir projeto:', err);
      res.status(500).send('Erro ao excluir o projeto');
    } else {
      res.send('Projeto excluído com sucesso');
    }
  });
});

// Rota para editar um projeto
app.get('/api/projetos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM projetos WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar projeto:', err);
      res.status(500).send('Erro ao buscar projeto');
    } else if (results.length === 0) {
      res.status(404).send('Projeto não encontrado');
    } else {
      res.json(results[0]);
    }
  });
});

// Rota para o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html')); // Corrigido para ir para a pasta frontend
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
