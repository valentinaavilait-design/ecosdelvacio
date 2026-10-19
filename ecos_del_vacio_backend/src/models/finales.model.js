const db = require('../config/db');

exports.listar = async () => {
  const { rows } = await db.query('SELECT * FROM finales ORDER BY id');
  return rows;
};

exports.obtener = async (id) => {
  const { rows } = await db.query('SELECT * FROM finales WHERE id = $1', [id]);
  return rows[0];
};
