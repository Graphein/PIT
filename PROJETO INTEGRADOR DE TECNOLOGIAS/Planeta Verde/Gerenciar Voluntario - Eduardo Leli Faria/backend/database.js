const mysql = require('mysql2');

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // altere para seu usuário MySQL
  password: '', // altere para sua senha do MySQL
  database: 'ecosis'
});

db.connect((err) => {
  if (err) {
    console.error('Erro de conexão com o banco de dados: ', err);
    return;
  }
  console.log('Conectado ao banco de dados');
});

module.exports = db;
