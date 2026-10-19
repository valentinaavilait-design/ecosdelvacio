const modelo = require('../models/personajes.model');

exports.listar = async (req, res, next) => {
  try {
    res.json(await modelo.listar());
  } catch (error) { next(error); }
};

exports.obtener = async (req, res, next) => {
  try {
    const personaje = await modelo.obtener(Number(req.params.id));
    if (!personaje) return res.status(404).json({ error: 'Personaje no encontrado' });
    res.json(personaje);
  } catch (error) { next(error); }
};

exports.crear = async (req, res, next) => {
  try {
    const { nombre, descripcion, habilidad } = req.body;
    if (!nombre || !descripcion) {
      return res.status(400).json({ error: 'Los campos nombre y descripcion son obligatorios' });
    }
    const personaje = await modelo.crear({ nombre, descripcion, habilidad: habilidad || null });
    res.status(201).json(personaje);
  } catch (error) { next(error); }
};

exports.actualizar = async (req, res, next) => {
  try {
    const { nombre, descripcion, habilidad } = req.body;
    if (!nombre || !descripcion) {
      return res.status(400).json({ error: 'Los campos nombre y descripcion son obligatorios' });
    }
    const personaje = await modelo.actualizar(Number(req.params.id), { nombre, descripcion, habilidad: habilidad || null });
    if (!personaje) return res.status(404).json({ error: 'Personaje no encontrado' });
    res.json(personaje);
  } catch (error) { next(error); }
};

exports.eliminar = async (req, res, next) => {
  try {
    const personaje = await modelo.eliminar(Number(req.params.id));
    if (!personaje) return res.status(404).json({ error: 'Personaje no encontrado' });
    res.json({ mensaje: 'Personaje eliminado correctamente', personaje });
  } catch (error) { next(error); }
};
