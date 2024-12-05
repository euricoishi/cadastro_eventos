const express = require('express')
const app = express()
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eventos'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro de conexão: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados como id' + connection.threadId);
});

app.post('/eventos', (req,res) => {
    const {nome_evento,descricao_evento,data_inicio_evento,data_fim_evento,local_evento} = req.body;

    if (!nome_evento || !descricao_evento || !data_inicio_evento || !data_fim_evento || !local_evento) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
      }
     
      const query = `INSERT INTO eventos (nome_evento, descricao_evento, data_inicio_evento, data_fim_evento, local_evento)
                     VALUES (?, ?, ?, ?, ?)`;
     
      connection.query(query, [nome_evento, descricao_evento, data_inicio_evento, data_fim_evento, local_evento], (err, results) => {
        if (err) {
          console.error('Erro ao inserir evento: ' + err.stack);
          return res.status(500).json({ message: 'Erro ao inserir evento' });
        }
     
        res.status(201).json({
          message: 'Evento inserido com sucesso',
          evento_id: results.insertId
        });
      });
    
})


app.listen(3000, () => {
    console.log("Fununciando")
})

