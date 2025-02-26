const express = require('express');
const ProjetoController = require('../controllers/ProjetoController');

const router = express.Router();

// Rota para atualizar um projeto
router.put('/projeto/:id', ProjetoController.atualizarProjeto);

module.exports = router;
