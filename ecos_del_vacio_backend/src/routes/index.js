const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ estado: 'ok', servicio: 'Ecos del Vacío API' });
});

router.use('/personajes', require('./personajes.routes'));
router.use('/finales', require('./finales.routes'));
router.use('/partidas', require('./partidas.routes'));
router.use('/decisiones', require('./decisiones.routes'));

module.exports = router;
