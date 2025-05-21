const db = require('../config/db');

const Teste = {
    create: (teste, callback) => {
        const query = 'INSERT INTO testes (titulo, descricao, ativo) VALUES (?, ?, ?)';
        db.query(query, [teste.titulo, teste.descricao, teste.ativo], (err, results) => {
            if (err) return callback(err);
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM testes WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    update: (id, teste, callback) => {
        const query = 'UPDATE testes SET titulo = ?, descricao = ?, ativo = ? WHERE id = ?';
        db.query(query, [teste.titulo, teste.descricao, teste.ativo, id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM testes WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM testes';
        db.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = Teste;
