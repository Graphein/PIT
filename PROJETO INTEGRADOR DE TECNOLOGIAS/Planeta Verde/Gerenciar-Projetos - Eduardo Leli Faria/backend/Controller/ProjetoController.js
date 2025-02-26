const ProjetoModel = require('../models/ProjetoModel');

class ProjetoController {
    // Método para atualizar um projeto
    async atualizarProjeto(req, res) {
        try {
            const { id } = req.params;
            const { nome, descricao, data_inicio, status } = req.body;

            // Buscar o projeto pelo ID
            const projeto = await ProjetoModel.buscaPorId(id);

            if (!projeto) {
                return res.status(404).json({
                    message: 'Projeto não encontrado',
                });
            }

            // Atualizar os dados do projeto
            projeto.nome = nome;
            projeto.descricao = descricao;
            projeto.data_inicio = data_inicio;
            projeto.status = status;

            // Persistir as alterações no banco
            await projeto.atualizar();

            res.status(200).json({
                message: 'Projeto atualizado com sucesso',
                data: projeto.toJSON(),
            });
        } catch (error) {
            console.error('Erro ao atualizar projeto:', error);
            res.status(500).json({
                message: 'Erro ao atualizar projeto',
                error: error.message,
            });
        }
    }
}

module.exports = new ProjetoController();
