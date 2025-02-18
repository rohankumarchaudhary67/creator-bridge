/*
  Warnings:

  - You are about to drop the `_youtubeEditorToyoutubeEnvironment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `youtubeChannel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `youtubeCreator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `youtubeEditor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `youtubeEnvironment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JoinRequest" DROP CONSTRAINT "JoinRequest_senderId_fkey";

-- DropForeignKey
ALTER TABLE "UserYoutubeToken" DROP CONSTRAINT "UserYoutubeToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "_youtubeEditorToyoutubeEnvironment" DROP CONSTRAINT "_youtubeEditorToyoutubeEnvironment_A_fkey";

-- DropForeignKey
ALTER TABLE "_youtubeEditorToyoutubeEnvironment" DROP CONSTRAINT "_youtubeEditorToyoutubeEnvironment_B_fkey";

-- DropForeignKey
ALTER TABLE "youtubeChannel" DROP CONSTRAINT "youtubeChannel_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "youtubeCreator" DROP CONSTRAINT "youtubeCreator_userId_fkey";

-- DropForeignKey
ALTER TABLE "youtubeEditor" DROP CONSTRAINT "youtubeEditor_userId_fkey";

-- DropForeignKey
ALTER TABLE "youtubeEnvironment" DROP CONSTRAINT "youtubeEnvironment_ownerId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_youtubeEditorToyoutubeEnvironment";

-- DropTable
DROP TABLE "youtubeChannel";

-- DropTable
DROP TABLE "youtubeCreator";

-- DropTable
DROP TABLE "youtubeEditor";

-- DropTable
DROP TABLE "youtubeEnvironment";

-- CreateTable
CREATE TABLE "YouTuberEnvironment" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YouTuberEnvironment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YoutubeChannel" (
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

    CONSTRAINT "YoutubeChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Editor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Editor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "YouTuberEnvironment_ownerId_key" ON "YouTuberEnvironment"("ownerId");

-- CreateIndex
CREATE INDEX "_Editor_B_index" ON "_Editor"("B");

-- AddForeignKey
ALTER TABLE "YouTuberEnvironment" ADD CONSTRAINT "YouTuberEnvironment_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YoutubeChannel" ADD CONSTRAINT "YoutubeChannel_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserYoutubeToken" ADD CONSTRAINT "UserYoutubeToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinRequest" ADD CONSTRAINT "JoinRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Editor" ADD CONSTRAINT "_Editor_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Editor" ADD CONSTRAINT "_Editor_B_fkey" FOREIGN KEY ("B") REFERENCES "YouTuberEnvironment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
