/*
  Warnings:

  - Added the required column `chatRoomId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "chatRoomId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Message_chatRoomId_idx" ON "Message"("chatRoomId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
