/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `ChatRooms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChatRooms_id_key" ON "ChatRooms"("id");
