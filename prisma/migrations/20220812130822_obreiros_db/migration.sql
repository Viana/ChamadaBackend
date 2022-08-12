/*
  Warnings:

  - A unique constraint covering the columns `[cracha]` on the table `Obreiros` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Obreiros_cracha_key" ON "Obreiros"("cracha");
