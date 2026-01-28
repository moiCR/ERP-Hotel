-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_idSede_fkey";

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "idSede" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_idSede_fkey" FOREIGN KEY ("idSede") REFERENCES "Sede"("id") ON DELETE SET NULL ON UPDATE CASCADE;
