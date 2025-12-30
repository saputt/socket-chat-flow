/*
  Warnings:

  - A unique constraint covering the columns `[idUser]` on the table `Sellers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idUser` to the `Sellers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sellers" ADD COLUMN     "idUser" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Sellers_idUser_key" ON "Sellers"("idUser");

-- AddForeignKey
ALTER TABLE "Sellers" ADD CONSTRAINT "Sellers_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
