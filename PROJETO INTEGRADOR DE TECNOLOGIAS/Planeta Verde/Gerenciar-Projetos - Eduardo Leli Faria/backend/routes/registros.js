const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Inserção (POST)
router.post('/', (req, res) => {
    const { nome, telefone, email } = req.body;
    const query = 'INSERT INTO registros (nome, telefone, email) VALUES (?, ?, ?)';
    db.query(query, [nome, telefone, email], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, nome, telefone, email });
    });
});

// Listagem (GET)
router.get('/', (req, res) => {
    const query = 'SELECT * FROM registros';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
});

// Busca por nome (GET)
router.get('/buscar', (req, res) => {
    const { nome } = req.query;  // Recebe o parâmetro 'nome' da query string
    if (!nome) {
        return res.status(400).json({ message: 'O parâmetro "nome" é obrigatório.' });
    }

    const query = 'SELECT * FROM registros WHERE nome LIKE ?';
    db.query(query, [`%${nome}%`], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
});
// Exemplo de rota para atualizar um projeto
app.put('/api/projetos/:id', (req, res) => {
    const id = req.params.id; // Id do projeto a ser atualizado
    const { nome, descricao, data_inicio, status } = req.body; // Dados recebidos no corpo da requisição
  
    // Aqui você precisa adicionar a lógica para atualizar o projeto no banco de dados
    // Por exemplo, atualizando um projeto com base no ID:
    const projeto = projetos.find(p => p.id === parseInt(id));
    if (!projeto) {
      return res.status(404).send('Projeto não encontrado');
    }
  
    projeto.nome = nome;
    projeto.descricao = descricao;
    projeto.data_inicio = data_inicio;
    projeto.status = status;
  
    res.status(200).send('Projeto atualizado com sucesso');
  });
  
// Exclusão (DELETE)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM registros WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'Registro excluído com sucesso' });
    });
});

// Atualização (PUT)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, telefone, email } = req.body;
    const query = 'UPDATE registros SET nome = ?, telefone = ?, email = ? WHERE id = ?';
    db.query(query, [nome, telefone, email, id], (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ id, nome, telefone, email });
    });
});

module.exports = router;
