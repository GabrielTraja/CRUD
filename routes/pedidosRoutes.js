const express = require('express');
const pedidoController = require('../controllers/pedidoController');
const router = express.Router();

router.get('/', pedidoController.getAllPedidos);
router.get('/new', pedidoController.renderCreateForm);
router.post('/', pedidoController.createPedido);
router.get('/:id', pedidoController.getPedidoById);
router.get('/:id/edit', pedidoController.renderEditForm);
router.put('/:id', pedidoController.updatePedido);
router.delete('/:id', pedidoController.deletePedido);

module.exports = router;