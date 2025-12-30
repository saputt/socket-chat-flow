/*
  Warnings:

  - You are about to drop the `ChatRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatRoomId_fkey";

-- DropTable
DROP TABLE "ChatRoom";

-- DropTable
DROP TABLE "Message";

-- CreateTable
CREATE TABLE "ChatRooms" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatRooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "sendTo" TEXT NOT NULL,
    "chatRoomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Messages_chatRoomId_idx" ON "Messages"("chatRoomId");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
