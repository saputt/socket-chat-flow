-- CreateEnum
CREATE TYPE "TypeRoom" AS ENUM ('PRIVATE', 'GROUP');

-- AlterTable
ALTER TABLE "ChatRooms" ADD COLUMN     "type" "TypeRoom" NOT NULL DEFAULT 'PRIVATE';
