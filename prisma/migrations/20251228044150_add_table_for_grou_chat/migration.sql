/*
  Warnings:

  - The primary key for the `ChatRooms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ChatRooms` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomId]` on the table `ChatRooms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomId` to the `ChatRooms` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GroupRole" AS ENUM ('ADMIN', 'MODERATOR', 'MEMBER');

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_chatRoomId_fkey";

-- DropIndex
DROP INDEX "ChatRooms_id_key";

-- AlterTable
ALTER TABLE "ChatRooms" DROP CONSTRAINT "ChatRooms_pkey",
DROP COLUMN "id",
ADD COLUMN     "adminId" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "roomId" TEXT NOT NULL,
ADD CONSTRAINT "ChatRooms_pkey" PRIMARY KEY ("roomId");

-- CreateTable
CREATE TABLE "RoomMembers" (
    "id" TEXT NOT NULL,
    "role" "GroupRole" NOT NULL DEFAULT 'MEMBER',
    "roomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RoomMembers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomMembers_userId_roomId_key" ON "RoomMembers"("userId", "roomId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatRooms_roomId_key" ON "ChatRooms"("roomId");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRooms"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMembers" ADD CONSTRAINT "RoomMembers_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "ChatRooms"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMembers" ADD CONSTRAINT "RoomMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
