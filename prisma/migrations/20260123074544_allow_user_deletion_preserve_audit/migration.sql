-- DropForeignKey
ALTER TABLE "Bitacora" DROP CONSTRAINT "Bitacora_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_idUsuario_fkey";

-- AlterTable
ALTER TABLE "Bitacora" ALTER COLUMN "idUsuario" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Reserva" ALTER COLUMN "idUsuario" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Bitacora" ADD CONSTRAINT "Bitacora_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
