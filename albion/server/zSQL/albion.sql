CREATE DATABASE albion_tabla;
USE albion_tabla;

CREATE table ciudades(
    ID char(2) not null PRIMARY KEY,
    nombre varchar(9)
);
CREATE table items(
    ID INT PRIMARY KEY,
    tipo varchar(20) not null,
    nombreprincipal varchar(10) not null,
    tier INT not null,
    nivel INT not null,
    rarerza varchar(10) not null
);

CREATE table ordenes(
    ciudadID char(2) not null,
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