DROP DATABASE IF EXISTS albion_tabla;
CREATE DATABASE IF NOT EXISTS albion_tabla;
USE albion_tabla;

CREATE table jugadores(
    ID int AUTO_INCREMENT not null PRIMARY KEY,
    nombre varchar(25) not null,
    presupuesto int DEFAULT 0
);

CREATE table ciudades(
    ID ENUM("pl","pm","pb","pd","pp","cl","cm","cb","cd","cp") not null PRIMARY KEY,
    nombre ENUM(
        "p_llanura","p_montaña","p_bosque","p_desierto","p_pantano",
        "c_llanura","c_montaña","c_bosque","c_desierto","c_pantano"
    ) not null
);

CREATE table items(
    ID INT not null PRIMARY KEY,
    tipo varchar(20) not null,
    nombreprincipal varchar(10) not null,
    tier INT not null,
    nivel INT not null,
    rarerza varchar(10) not null
);

CREATE table jugadores_historial(
    id_movimiento int AUTO_INCREMENT not null,
    id_jugador int not null,
    id_item int not null,
    monto int DEFAULT 0,
    FOREIGN KEY (id_jugador) REFERENCES jugadores(ID),
    FOREIGN KEY (id_item) REFERENCES items(ID),
    PRIMARY KEY (id_movimiento, id_jugador)
);

CREATE table ordenes(
    ciudadID ENUM("pl","pm","pb","pd","pp","cl","cm","cb","cd","cp") not null,
    itemID INT not null,
    precio_compra INT not null,
    precio_venta INT not null,
    FOREIGN KEY (ciudadID) REFERENCES ciudades(ID),
    FOREIGN KEY (itemID) REFERENCES items(ID),
    PRIMARY KEY (ciudadID, itemID)
);

CREATE table imgs(
    itemID varchar(100) NOT NULL,
    dir varchar(200) DEFAULT NULL,
    archivo varchar(100) DEFAULT NULL,
    formato SET('.jpg', '.jpeg', '.png') DEFAULT '.jpg'
);