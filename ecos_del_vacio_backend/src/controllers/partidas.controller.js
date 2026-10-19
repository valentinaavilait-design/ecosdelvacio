const modelo = require('../models/partidas.model');
const personajes = require('../models/personajes.model');

exports.listar = async (req, res, next) => {
  try { res.json(await modelo.listar()); } catch (error) { next(error); }
};

exports.obtener = async (req, res, next) => {
  try {
    const partida = await modelo.obtener(Number(req.params.id));
    if (!partida) return res.status(404).json({ error: 'Partida no encontrada' });
    res.json(partida);
  } catch (error) { next(error); }
};

exports.crear = async (req, res, next) => {
  try {
    const { jugador, personaje_id } = req.body;
    if (!jugador || !personaje_id) {
      return res.status(400).json({ error: 'Los campos jugador y personaje_id son obligatorios' });
    }
    const personaje = await personajes.obtener(Number(personaje_id));
    if (!personaje) return res.status(400).json({ error: 'El personaje indicado no existe' });
    const partida = await modelo.crear({ jugador, personaje_id: Number(personaje_id) });
    res.status(201).json(partida);
  } catch (error) { next(error); }
};

exports.finalizar = async (req, res, next) => {
  try {
    const { final_id } = req.body;
    if (!final_id) return res.status(400).json({ error: 'El campo final_id es obligatorio' });
    const partida = await modelo.finalizar(Number(req.params.id), Number(final_id));
    if (!partida) return res.status(404).json({ error: 'Partida no encontrada o final inexistente' });
    res.json(partida);
  } catch (error) { next(error); }
};
