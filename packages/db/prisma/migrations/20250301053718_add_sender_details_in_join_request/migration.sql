/*
  Warnings:

  - A unique constraint covering the columns `[requestId]` on the table `JoinRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "JoinRequest" ADD COLUMN     "reieverEmail" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "senderEmail" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "senderImage" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "senderName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "senderYouTubeChannel" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "JoinRequest_requestId_key" ON "JoinRequest"("requestId");
