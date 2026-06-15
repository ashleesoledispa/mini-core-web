-- CreateTable
CREATE TABLE "Repartidor" (
    "id_repartidor" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "email" TEXT
);

-- CreateTable
CREATE TABLE "Zona" (
    "id_zona" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre_zona" TEXT NOT NULL,
    "tarifa_por_kg" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Envio" (
    "id_envio" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_repartidor" INTEGER NOT NULL,
    "id_zona" INTEGER NOT NULL,
    "peso_kg" REAL NOT NULL,
    "fecha_envio" DATETIME NOT NULL,
    CONSTRAINT "Envio_id_repartidor_fkey" FOREIGN KEY ("id_repartidor") REFERENCES "Repartidor" ("id_repartidor") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Envio_id_zona_fkey" FOREIGN KEY ("id_zona") REFERENCES "Zona" ("id_zona") ON DELETE RESTRICT ON UPDATE CASCADE
);
