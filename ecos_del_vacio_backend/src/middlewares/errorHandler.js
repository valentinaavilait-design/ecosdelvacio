module.exports = (error, req, res, next) => {
  console.error(error);
  if (error.code === '23505') {
    return res.status(409).json({ error: 'Ya existe un registro con esos datos únicos' });
  }
  if (error.code === '23503') {
    return res.status(400).json({ error: 'La referencia indicada no existe o está siendo utilizada' });
  }
  res.status(500).json({ error: 'Error interno del servidor' });
};
