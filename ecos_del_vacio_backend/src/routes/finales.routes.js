const express = require('express');
const router = express.Router();
const controller = require('../controllers/finales.controller');

router.get('/', controller.listar);
router.get('/:id', controller.obtener);

module.exports = router;
