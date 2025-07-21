-- init.sql

-- Crea la tabla solo si no existe aún
CREATE TABLE IF NOT EXISTS documentos_confirmados (
  id SERIAL PRIMARY KEY,
  area TEXT NOT NULL,
  filename TEXT NOT NULL,
  jefe TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL,
  expediente TEXT NOT NULL
);
