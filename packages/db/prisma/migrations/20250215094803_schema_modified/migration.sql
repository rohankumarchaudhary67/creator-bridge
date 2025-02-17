/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `YTChannel` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sessionToken` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "JoinRequest" DROP CONSTRAINT "JoinRequest_senderId_fkey";

-- DropForeignKey
ALTER TABLE "UserYoutubeToken" DROP CONSTRAINT "UserYoutubeToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "YTChannel" DROP CONSTRAINT "YTChannel_ownerId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "role",
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "sessionToken" SET NOT NULL;

-- DropTable
DROP TABLE "YTChannel";

-- DropEnum
DROP TYPE "VideoStatus";

-- CreateTable
CREATE TABLE "youtubeEditor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "youtubeEditor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "youtubeEnvironment" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "youtubeEnvironment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "youtubeCreator" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "youtubeCreator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "youtubeChannel" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "channelId" TEXT,
    "channelTitle" TEXT,
    "channelDescription" TEXT,
    "subscriberCount" INTEGER,
    "videoCount" INTEGER,
    "thumbnailUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "youtubeChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_youtubeEditorToyoutubeEnvironment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_youtubeEditorToyoutubeEnvironment_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "youtubeEditor_userId_key" ON "youtubeEditor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "youtubeEnvironment_ownerId_key" ON "youtubeEnvironment"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "youtubeCreator_userId_key" ON "youtubeCreator"("userId");

-- CreateIndex
CREATE INDEX "_youtubeEditorToyoutubeEnvironment_B_index" ON "_youtubeEditorToyoutubeEnvironment"("B");

-- AddForeignKey
ALTER TABLE "youtubeEditor" ADD CONSTRAINT "youtubeEditor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "youtubeEnvironment" ADD CONSTRAINT "youtubeEnvironment_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "youtubeCreator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "youtubeCreator" ADD CONSTRAINT "youtubeCreator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "youtubeChannel" ADD CONSTRAINT "youtubeChannel_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "youtubeCreator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserYoutubeToken" ADD CONSTRAINT "UserYoutubeToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "youtubeCreator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinRequest" ADD CONSTRAINT "JoinRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "youtubeCreator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_youtubeEditorToyoutubeEnvironment" ADD CONSTRAINT "_youtubeEditorToyoutubeEnvironment_A_fkey" FOREIGN KEY ("A") REFERENCES "youtubeEditor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_youtubeEditorToyoutubeEnvironment" ADD CONSTRAINT "_youtubeEditorToyoutubeEnvironment_B_fkey" FOREIGN KEY ("B") REFERENCES "youtubeEnvironment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
