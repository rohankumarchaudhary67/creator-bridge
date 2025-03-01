/*
  Warnings:

  - You are about to drop the column `reieverEmail` on the `JoinRequest` table. All the data in the column will be lost.
  - You are about to drop the column `senderYouTubeChannel` on the `JoinRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JoinRequest" DROP COLUMN "reieverEmail",
DROP COLUMN "senderYouTubeChannel",
ADD COLUMN     "recieverEmail" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "senderYouTubeChannelId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "senderYouTubeChannelImage" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "senderYouTubeChannelName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "senderYouTubeSubscriberCount" INTEGER NOT NULL DEFAULT 0;
