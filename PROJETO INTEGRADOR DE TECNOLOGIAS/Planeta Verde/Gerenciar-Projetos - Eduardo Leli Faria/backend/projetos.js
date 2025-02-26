const express = require('express');
const db = require('../db/db');
const router = express.Router();

// Listar todos os projetos com filtro opcional
router.get('/', async (req, res) => {
    const { nome, status } = req.query;
    let query = "SELECT * FROM projetos WHERE 1=1";
    if (nome) query += ` AND nome LIKE '%${nome}%'`;
    if (status) query += ` AND status='${status}'`;
    const projetos = await db.query(query);
    res.json(projetos);
});

// Criar novo projeto
router.post('/', async (req, res) => {
    const { nome, descricao, data_inicio, status } = req.body;
    const result = await db.query(
        "INSERT INTO projetos (nome, descricao, data_inicio, status) VALUES (?, ?, ?, ?)",
        [nome, descricao, data_inicio, status]
    );
    res.json({ id: result.insertId });
});

// Atualizar projeto
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, data_inicio, status } = req.body;
    await db.query(
        "UPDATE projetos SET nome=?, descricao=?, data_inicio=?, status=? WHERE id=?",
        [nome, descricao, data_inicio, status, id]
    );
    res.sendStatus(200);
});

// Excluir projeto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await db.query("DELETE FROM projetos WHERE id=?", [id]);
    res.sendStatus(200);
});

module.exports = router;
