const db = require('../config/db');

exports.listar = async () => {
  const { rows } = await db.query(`
    SELECT p.id, p.jugador, p.estado, p.fecha_inicio, p.fecha_fin,
           pe.nombre AS personaje, f.nombre AS final
    FROM partidas p
    JOIN personajes pe ON pe.id = p.personaje_id
    LEFT JOIN finales f ON f.id = p.final_id
    ORDER BY p.id DESC
  `);
  return rows;
};

exports.obtener = async (id) => {
  const { rows } = await db.query(`
    SELECT p.id, p.jugador, p.estado, p.fecha_inicio, p.fecha_fin,
           p.personaje_id, pe.nombre AS personaje, p.final_id, f.nombre AS final
    FROM partidas p
    JOIN personajes pe ON pe.id = p.personaje_id
    LEFT JOIN finales f ON f.id = p.final_id
    WHERE p.id = $1
  `, [id]);
  return rows[0];
};

exports.crear = async ({ jugador, personaje_id }) => {
  const { rows } = await db.query(
    `INSERT INTO partidas (jugador, personaje_id) VALUES ($1, $2) RETURNING *`,
    [jugador, personaje_id]
  );
  return rows[0];
};

exports.finalizar = async (id, final_id) => {
  const { rows } = await db.query(
    `UPDATE partidas SET final_id = $1, estado = 'finalizada', fecha_fin = NOW()
     WHERE id = $2 AND EXISTS (SELECT 1 FROM finales WHERE id = $1)
     RETURNING *`,
    [final_id, id]
  );
  return rows[0];
};
