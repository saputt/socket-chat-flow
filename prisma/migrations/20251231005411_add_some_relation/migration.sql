-- AddForeignKey
ALTER TABLE "ChatRooms" ADD CONSTRAINT "ChatRooms_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
