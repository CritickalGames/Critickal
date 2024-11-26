CREATE DATABASE acciones;

USE acciones;

CREATE TABLE acciones (
    simbolo VARCHAR(10) PRIMARY KEY,  -- El símbolo de la acción como clave primaria
    precio DECIMAL(10, 2) NOT NULL,
    dividendo DECIMAL(10, 2) NOT NULL,
    pagas INT CHECK (pagas BETWEEN -1 AND 12),
    meses_de_pago VARCHAR(37), -- Se puede guardar como una cadena de texto
    rendimiento DECIMAL(5, 2) NOT NULL,
    inversion DECIMAL(15, 2) NOT NULL,
    ganancia DECIMAL(15, 2) NOT NULL
);