-- =============================================
-- SCRIPT: SISTEMA INTEGRAL DE GESTIÓN DE FARMACIA (SIGEFAR)
-- Base de datos: db_farmacia
-- =============================================
DROP TABLE IF EXISTS venta;
DROP TABLE IF EXISTS medicamento;
DROP TABLE IF EXISTS cliente;
-- =============================================
-- TABLA: cliente
-- =============================================

CREATE TABLE cliente(
    id_cliente SERIAL PRIMARY KEY,
    nomb_cli TEXT NOT NULL,
    ape_cli TEXT NOT NULL,
    dni TEXT UNIQUE NOT NULL,
    telefono TEXT
);

-- =============================================
-- TABLA: medicamento
-- =============================================

CREATE TABLE medicamento(
    id_medicamento SERIAL PRIMARY KEY,
    nomb_med TEXT NOT NULL,
    precio NUMERIC(10,2) NOT NULL CHECK(precio > 0),
    stock INTEGER NOT NULL CHECK(stock >= 0)
);

-- =============================================
-- TABLA: venta
-- =============================================

CREATE TABLE venta(
    id_venta SERIAL PRIMARY KEY,
    fecha_venta TEXT NOT NULL,
    id_cliente INTEGER NOT NULL,
    id_medicamento INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    total NUMERIC(10,2) NOT NULL,

    FOREIGN KEY (id_cliente)
        REFERENCES cliente(id_cliente),

    FOREIGN KEY (id_medicamento)
        REFERENCES medicamento(id_medicamento)
);

-- =============================================
-- DATOS DE PRUEBA
-- =============================================

INSERT INTO cliente (nomb_cli, ape_cli, dni, telefono)
VALUES
('Alberto','Flores','48625788','999548854'),
('Franco','Garcia','03457815','956785455'),
('Antonio','Villagran','08654211','909877574');

INSERT INTO medicamento (nomb_med, precio, stock)
VALUES
('Paracetamol', 2.50, 98),
('Ibuprofeno', 3.00, 77),
('Amoxicilina', 8.50, 49);

INSERT INTO venta
(fecha_venta, id_cliente, id_medicamento, cantidad, total)
VALUES
('2025-08-10',1,1,2,5.00),
('2025-08-11',2,2,3,9.00),
('2025-08-12',3,3,1,8.50);

SELECT * FROM cliente;

SELECT * FROM medicamento;

SELECT * FROM venta;

-- =============================================
-- VERIFICAR REGISTROS
-- =============================================

SELECT 'cliente' AS tabla, COUNT(*) AS registros FROM cliente
UNION ALL
SELECT 'medicamento', COUNT(*) FROM medicamento
UNION ALL
SELECT 'venta', COUNT(*) FROM venta;