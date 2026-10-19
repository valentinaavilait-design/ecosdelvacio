const db = require('../config/db');

exports.listar = async () => {
  const { rows } = await db.query('SELECT * FROM personajes ORDER BY id');
  return rows;
};

exports.obtener = async (id) => {
  const { rows } = await db.query('SELECT * FROM personajes WHERE id = $1', [id]);
  return rows[0];
};

exports.crear = async ({ nombre, descripcion, habilidad }) => {
  const { rows } = await db.query(
    'INSERT INTO personajes (nombre, descripcion, habilidad) VALUES ($1, $2, $3) RETURNING *',
    [nombre, descripcion, habilidad]
  );
  return rows[0];
};

exports.actualizar = async (id, { nombre, descripcion, habilidad }) => {
  const { rows } = await db.query(
    'UPDATE personajes SET nombre = $1, descripcion = $2, habilidad = $3 WHERE id = $4 RETURNING *',
    [nombre, descripcion, habilidad, id]
  );
  return rows[0];
};

exports.eliminar = async (id) => {
  const { rows } = await db.query('DELETE FROM personajes WHERE id = $1 RETURNING *', [id]);
  return rows[0];
};
