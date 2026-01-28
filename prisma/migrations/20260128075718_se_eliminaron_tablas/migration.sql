/*
  Warnings:

  - You are about to drop the `Modulo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PermisoRol` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Modulo" DROP CONSTRAINT "Modulo_idSede_fkey";

-- DropForeignKey
ALTER TABLE "PermisoRol" DROP CONSTRAINT "PermisoRol_idModulo_fkey";

-- DropForeignKey
ALTER TABLE "PermisoRol" DROP CONSTRAINT "PermisoRol_idRol_fkey";

-- DropTable
DROP TABLE "Modulo";

-- DropTable
DROP TABLE "PermisoRol";
