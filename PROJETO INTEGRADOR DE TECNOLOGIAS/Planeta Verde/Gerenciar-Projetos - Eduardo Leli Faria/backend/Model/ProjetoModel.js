class ProjetoModel {
    static async buscaPorId(id) {
        const [rows] = await db.query('SELECT * FROM projetos WHERE id = ?', [id]);
        return rows[0];  // Retorna o primeiro projeto encontrado
    }

    async atualizar() {
        const sql = `UPDATE projetos SET nome = ?, descricao = ?, data_inicio = ?, status = ? WHERE id = ?`;
        const values = [this.nome, this.descricao, this.data_inicio, this.status, this.id];

        try {
            const [result] = await db.query(sql, values);
            return result;  // Pode retornar um resultado da consulta se necessário
        } catch (err) {
            throw new Error('Erro ao atualizar o projeto: ' + err.message);
        }
    }

    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            descricao: this.descricao,
            data_inicio: this.data_inicio,
            status: this.status,
        };
    }
}

module.exports = ProjetoModel;