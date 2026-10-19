-- DML: datos iniciales para pruebas y demostración
INSERT INTO personajes (nombre, descripcion, habilidad) VALUES
('Viajero', 'Un ser que despierta sin nombre en un bosque antiguo.', 'Exploración'),
('Errante', 'Un explorador que busca respuestas en un mundo que cambia.', 'Resistencia')
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO finales (nombre, tipo, descripcion) VALUES
('El Refugio', 'bueno', 'El protagonista encuentra un refugio seguro y una comunidad que comienza a reconstruir su mundo.'),
('Sin Salida', 'neutral', 'El protagonista queda atrapado en un edificio aparentemente seguro.'),
('El Error', 'malo', 'Una decisión equivocada conduce al protagonista a un destino fatal.')
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO decisiones (escena, opcion, consecuencia, destino) VALUES
('El despertar entre raíces', 'Seguir la luz azulada', 'El protagonista descubre un sendero entre los árboles.', 'Bosque antiguo'),
('Bosque antiguo', 'Explorar una cueva', 'Puede encontrar recursos, pistas o nuevos peligros.', 'Cueva profunda'),
('Bosque antiguo', 'Continuar por el sendero', 'Avanza hacia otra zona interconectada.', 'Sendero'),
('Cruce de caminos', 'Seguir el humo', 'Se dirige hacia una posible señal de vida.', 'Zona de humo'),
('Cruce de caminos', 'Seguir el silencio', 'Se adentra en una región desconocida.', 'Zona silenciosa')
ON CONFLICT DO NOTHING;
