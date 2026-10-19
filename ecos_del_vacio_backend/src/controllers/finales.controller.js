const modelo = require('../models/finales.model');

exports.listar = async (req, res, next) => {
  try { res.json(await modelo.listar()); } catch (error) { next(error); }
};

exports.obtener = async (req, res, next) => {
  try {
    const final = await modelo.obtener(Number(req.params.id));
    if (!final) return res.status(404).json({ error: 'Final no encontrado' });
    res.json(final);
  } catch (error) { next(error); }
};
