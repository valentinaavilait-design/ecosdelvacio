const db = require('../config/db');

exports.listar = async ({ escena } = {}) => {
  if (escena) {
    const { rows } = await db.query('SELECT * FROM decisiones WHERE escena = $1 ORDER BY id', [escena]);
    return rows;
  }
  const { rows } = await db.query('SELECT * FROM decisiones ORDER BY id');
  return rows;
};

exports.obtener = async (id) => {
  const { rows } = await db.query('SELECT * FROM decisiones WHERE id = $1', [id]);
  return rows[0];
};
