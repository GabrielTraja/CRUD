const Teste = require('../models/testeModel');

const testeController = {

    createTeste: (req, res) => {
        const newTeste = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            ativo: req.body.ativo === 'on' ? true : false
        };

        Teste.create(newTeste, (err, testeId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/testes');
        });
    },

    getTesteById: (req, res) => {
        const testeId = req.params.id;

        Teste.findById(testeId, (err, teste) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!teste) {
                return res.status(404).json({ message: 'Teste not found' });
            }
            res.render('testes/edit', { teste });
        });
    },

    getAllTestes: (req, res) => {
        Teste.getAll((err, testes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('testes/index', { testes });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('testes/create');
    },

    renderEditForm: (req, res) => {
        const testeId = req.params.id;

        Teste.findById(testeId, (err, teste) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!teste) {
                return res.status(404).json({ message: 'Teste not found' });
            }
            res.render('testes/edit', { teste });
        });
    },

    updateTeste: (req, res) => {
        const testeId = req.params.id;
        const updatedTeste = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            ativo: req.body.ativo === 'on'
        };

        Teste.update(testeId, updatedTeste, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/testes');
        });
    },

    deleteTeste: (req, res) => {
        const testeId = req.params.id;

        Teste.delete(testeId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/testes');
        });
    }
};

module.exports = testeController;
