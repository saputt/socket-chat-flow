/*
  Warnings:

  - A unique constraint covering the columns `[adminId,name]` on the table `ChatRooms` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_chatRoomId_fkey";

-- DropForeignKey
ALTER TABLE "RoomMembers" DROP CONSTRAINT "RoomMembers_userId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "ChatRooms_adminId_name_key" ON "ChatRooms"("adminId", "name");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRooms"("roomId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMembers" ADD CONSTRAINT "RoomMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
