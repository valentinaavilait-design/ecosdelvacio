-- DDL: estructura de la base de datos de Ecos del Vacío
CREATE TABLE IF NOT EXISTS personajes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL UNIQUE,
    descripcion TEXT NOT NULL,
    habilidad VARCHAR(120),
    creado_en TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS finales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('bueno', 'neutral', 'malo')),
    descripcion TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS partidas (
    id SERIAL PRIMARY KEY,
    jugador VARCHAR(80) NOT NULL,
    personaje_id INTEGER NOT NULL REFERENCES personajes(id) ON DELETE RESTRICT,
    final_id INTEGER REFERENCES finales(id) ON DELETE SET NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'en_curso'
        CHECK (estado IN ('en_curso', 'finalizada')),
    fecha_inicio TIMESTAMP NOT NULL DEFAULT NOW(),
    fecha_fin TIMESTAMP,
    CHECK (
      (estado = 'en_curso' AND fecha_fin IS NULL)
      OR (estado = 'finalizada' AND fecha_fin IS NOT NULL)
    )
);

CREATE TABLE IF NOT EXISTS decisiones (
    id SERIAL PRIMARY KEY,
    escena VARCHAR(100) NOT NULL,
    opcion VARCHAR(180) NOT NULL,
    consecuencia TEXT NOT NULL,
    destino VARCHAR(100) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_partidas_personaje ON partidas(personaje_id);
CREATE INDEX IF NOT EXISTS idx_partidas_final ON partidas(final_id);
CREATE INDEX IF NOT EXISTS idx_decisiones_escena ON decisiones(escena);
