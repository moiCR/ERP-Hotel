-- CreateTable
CREATE TABLE "Sede" (
    "id" SERIAL NOT NULL,
    "ciudad" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "central" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Sede_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modulo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "idSede" INTEGER NOT NULL,

    CONSTRAINT "Modulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermisoRol" (
    "id" SERIAL NOT NULL,
    "idRol" INTEGER NOT NULL,
    "idModulo" INTEGER NOT NULL,
    "lectura" BOOLEAN NOT NULL DEFAULT false,
    "escritura" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PermisoRol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "contrasena" TEXT NOT NULL,
    "intentosFallidos" INTEGER NOT NULL DEFAULT 0,
    "idRol" INTEGER NOT NULL,
    "idSede" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bitacora" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "fechaIngreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaSalida" TIMESTAMP(3),

    CONSTRAINT "Bitacora_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriaHabitacion" (
    "id" SERIAL NOT NULL,
    "nombreCategoria" TEXT NOT NULL,

    CONSTRAINT "CategoriaHabitacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habitacion" (
    "id" SERIAL NOT NULL,
    "piso" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,
    "idSede" INTEGER NOT NULL,
    "idCategoria" INTEGER NOT NULL,

    CONSTRAINT "Habitacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idHabitacion" INTEGER NOT NULL,
    "idCliente" INTEGER NOT NULL,
    "fechaReserva" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaSalida" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Factura" (
    "id" SERIAL NOT NULL,
    "idReserva" INTEGER NOT NULL,
    "totalIva" DOUBLE PRECISION NOT NULL,
    "tipoCambio" DOUBLE PRECISION NOT NULL,
    "montoDolares" DOUBLE PRECISION NOT NULL,
    "montoTarjeta" DOUBLE PRECISION NOT NULL,
    "vuelto" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Factura_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Modulo_nombre_key" ON "Modulo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Rol_nombre_key" ON "Rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cedula_key" ON "Cliente"("cedula");

-- AddForeignKey
ALTER TABLE "Modulo" ADD CONSTRAINT "Modulo_idSede_fkey" FOREIGN KEY ("idSede") REFERENCES "Sede"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisoRol" ADD CONSTRAINT "PermisoRol_idRol_fkey" FOREIGN KEY ("idRol") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisoRol" ADD CONSTRAINT "PermisoRol_idModulo_fkey" FOREIGN KEY ("idModulo") REFERENCES "Modulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_idRol_fkey" FOREIGN KEY ("idRol") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_idSede_fkey" FOREIGN KEY ("idSede") REFERENCES "Sede"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bitacora" ADD CONSTRAINT "Bitacora_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habitacion" ADD CONSTRAINT "Habitacion_idSede_fkey" FOREIGN KEY ("idSede") REFERENCES "Sede"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habitacion" ADD CONSTRAINT "Habitacion_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "CategoriaHabitacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_idHabitacion_fkey" FOREIGN KEY ("idHabitacion") REFERENCES "Habitacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_idReserva_fkey" FOREIGN KEY ("idReserva") REFERENCES "Reserva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
