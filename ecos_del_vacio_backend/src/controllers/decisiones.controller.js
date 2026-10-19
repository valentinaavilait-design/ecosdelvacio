const modelo = require('../models/decisiones.model');

exports.listar = async (req, res, next) => {
  try {
    const filtros = {};
    if (req.query.escena) filtros.escena = String(req.query.escena);
    res.json(await modelo.listar(filtros));
  } catch (error) { next(error); }
};

exports.obtener = async (req, res, next) => {
  try {
    const decision = await modelo.obtener(Number(req.params.id));
    if (!decision) return res.status(404).json({ error: 'Decisión no encontrada' });
    res.json(decision);
  } catch (error) { next(error); }
};
