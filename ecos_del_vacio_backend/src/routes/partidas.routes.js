const express = require('express');
const router = express.Router();
const controller = require('../controllers/partidas.controller');

router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.post('/', controller.crear);
router.patch('/:id/finalizar', controller.finalizar);

module.exports = router;
