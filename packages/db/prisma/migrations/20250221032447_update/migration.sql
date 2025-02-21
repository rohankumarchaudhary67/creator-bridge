/*
  Warnings:

  - You are about to drop the `YouTuberEnvironment` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "VideoStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_senderId_fkey";

-- DropForeignKey
ALTER TABLE "UserYoutubeToken" DROP CONSTRAINT "UserYoutubeToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "YouTubeVideo" DROP CONSTRAINT "YouTubeVideo_editorId_fkey";

-- DropForeignKey
ALTER TABLE "YouTuberEnvironment" DROP CONSTRAINT "YouTuberEnvironment_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "YoutubeChannel" DROP CONSTRAINT "YoutubeChannel_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "_Editor" DROP CONSTRAINT "_Editor_A_fkey";

-- DropForeignKey
ALTER TABLE "_Editor" DROP CONSTRAINT "_Editor_B_fkey";

-- AlterTable
ALTER TABLE "YouTubeVideo" ADD COLUMN     "category" TEXT,
ADD COLUMN     "creatorResponse" TEXT,
ADD COLUMN     "status" "VideoStatus",
ADD COLUMN     "visibility" TEXT;

-- DropTable
DROP TABLE "YouTuberEnvironment";

-- CreateTable
CREATE TABLE "YouTubeCreator" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "approvedVideos" INTEGER NOT NULL DEFAULT 0,
    "rejectedVideos" INTEGER NOT NULL DEFAULT 0,
    "pendingVideos" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YouTubeCreator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YouTubeEditor" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "totalVideos" INTEGER NOT NULL DEFAULT 0,
    "approvedVideos" INTEGER NOT NULL DEFAULT 0,
    "rejectedVideos" INTEGER NOT NULL DEFAULT 0,
    "pendingVideos" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YouTubeEditor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "YouTubeCreator_ownerId_key" ON "YouTubeCreator"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "YouTubeEditor_ownerId_key" ON "YouTubeEditor"("ownerId");

-- AddForeignKey
ALTER TABLE "YouTubeCreator" ADD CONSTRAINT "YouTubeCreator_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YouTubeEditor" ADD CONSTRAINT "YouTubeEditor_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YouTubeVideo" ADD CONSTRAINT "YouTubeVideo_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "YouTubeEditor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YoutubeChannel" ADD CONSTRAINT "YoutubeChannel_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "YouTubeCreator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserYoutubeToken" ADD CONSTRAINT "UserYoutubeToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "YouTubeCreator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "YouTubeCreator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Editor" ADD CONSTRAINT "_Editor_A_fkey" FOREIGN KEY ("A") REFERENCES "YouTubeCreator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Editor" ADD CONSTRAINT "_Editor_B_fkey" FOREIGN KEY ("B") REFERENCES "YouTubeEditor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
