const express = require('express');
const router = express.Router();
const controller = require('../controllers/decisiones.controller');

router.get('/', controller.listar);
router.get('/:id', controller.obtener);

module.exports = router;
