const db = require('../config/db');

const Pedido = {
    create: (pedido, callback) => {
        const query = 'INSERT INTO pedidos (nome_produto, quantidade, preco) VALUES (?, ?, ?)';
        db.query(query, [pedido.nome_produto, pedido.quantidade, pedido.preco], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM pedidos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, pedido, callback) => {
        const query = 'UPDATE pedidos SET nome_produto = ?, quantidade = ?, preco = ? WHERE id = ?';
        db.query(query, [pedido.nome_produto, pedido.quantidade, pedido.preco, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM pedidos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM pedidos';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Pedido;