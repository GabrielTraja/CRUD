const db = require('../config/db');

// Listar todos os pedidos
exports.listarPedidos = (req, res) => {
    db.query('SELECT * FROM pedidos', (err, results) => {
        if (err) return res.status(500).json({ erro: err });
        res.json(results);
    });
};

// Buscar pedido por ID
exports.buscarPedidoPorId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM pedidos WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ erro: err });
        if (results.length === 0) return res.status(404).json({ mensagem: 'Pedido não encontrado' });
        res.json(results[0]);
    });
};

// Criar novo pedido
exports.criarPedido = (req, res) => {
    const { nome_produto, quantidade, preco } = req.body;
    db.query(
        'INSERT INTO pedidos (nome_produto, quantidade, preco) VALUES (?, ?, ?)',
        [nome_produto, quantidade, preco],
        (err, result) => {
            if (err) return res.status(500).json({ erro: err });
            res.status(201).json({ id: result.insertId, nome_produto, quantidade, preco });
        }
    );
};

// Atualizar pedido existente
exports.atualizarPedido = (req, res) => {
    const id = req.params.id;
    const { nome_produto, quantidade, preco } = req.body;
    db.query(
        'UPDATE pedidos SET nome_produto = ?, quantidade = ?, preco = ? WHERE id = ?',
        [nome_produto, quantidade, preco, id],
        (err, result) => {
            if (err) return res.status(500).json({ erro: err });
            if (result.affectedRows === 0) return res.status(404).json({ mensagem: 'Pedido não encontrado' });
            res.json({ id, nome_produto, quantidade, preco });
        }
    );
};

// Deletar pedido
exports.deletarPedido = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM pedidos WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ erro: err });
        if (result.affectedRows === 0) return res.status(404).json({ mensagem: 'Pedido não encontrado' });
        res.status(204).send();
    });
};