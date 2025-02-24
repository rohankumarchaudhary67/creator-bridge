/*
  Warnings:

  - A unique constraint covering the columns `[channelId]` on the table `YoutubeChannel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "YoutubeChannel_channelId_key" ON "YoutubeChannel"("channelId");
