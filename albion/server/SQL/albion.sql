DROP DATABASE IF EXISTS albion_tabla;
CREATE DATABASE IF NOT EXISTS albion_tabla;
USE albion_tabla;
-- fase 1
CREATE table jugadores(
    ID int AUTO_INCREMENT not null PRIMARY KEY,
    nombre varchar(25) not null,
    presupuesto int DEFAULT 0
);

CREATE table ciudades(
    ID ENUM("pp","pc","mp","mc","bp","bc","dp","dc","lp","lc") not null PRIMARY KEY,
    nombre varchar(20) not null,
    CHECK (ID IN ("pp","pc","mp","mc","bp","bc","dp","dc","lp","lc"))
);

CREATE table itemes(
    ID INT not null,
    tipo varchar(20) not null,
    nombre_principal varchar(20) not null,
    tier TINYINT not null,
    nivel TINYINT not null,
    rareza int DEFAULT 1,
    cualidad TINYINT not null,
    PRIMARY KEY (ID)
);

-- Fase 2
CREATE table imges(
    itemID INT NOT NULL,
    dir varchar(200) DEFAULT NULL,
    archivo varchar(100) DEFAULT NULL,
    formato SET('.jpg', '.jpeg', '.png') DEFAULT '.jpg' not null,
    FOREIGN KEY (itemID) REFERENCES itemes(ID),
    PRIMARY KEY (itemID)
);

CREATE table jugadores_historiales(
    id_movimiento int AUTO_INCREMENT not null,
    id_jugador int not null,
    id_item int not null,
    item_cant int not null,
    item_precio int not null,
    monto int DEFAULT 0,
    FOREIGN KEY (id_jugador) REFERENCES jugadores(ID),
    FOREIGN KEY (id_item) REFERENCES itemes(ID),
    PRIMARY KEY (id_movimiento, id_jugador)
);

CREATE table ordenes(
    ciudadID ENUM("pp","pc","mp","mc","bp","bc","dp","dc","lp","lc") not null,
    itemID INT not null,
    precio_compra INT not null,
    precio_venta INT not null,
    FOREIGN KEY (ciudadID) REFERENCES ciudades(ID),
    FOREIGN KEY (itemID) REFERENCES itemes(ID),
    PRIMARY KEY (ciudadID, itemID)
);