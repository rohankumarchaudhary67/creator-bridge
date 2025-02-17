/*
  Warnings:

  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `YTCreator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `YTEditor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_editorId_fkey";

-- DropForeignKey
ALTER TABLE "YTCreator" DROP CONSTRAINT "YTCreator_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "YTCreator" DROP CONSTRAINT "YTCreator_yTEditorId_fkey";

-- DropForeignKey
ALTER TABLE "YTEditor" DROP CONSTRAINT "YTEditor_userId_fkey";

-- DropTable
DROP TABLE "Video";

-- DropTable
DROP TABLE "YTCreator";

-- DropTable
DROP TABLE "YTEditor";

-- CreateTable
CREATE TABLE "YTChannel" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "channelId" TEXT,
    "channelTitle" TEXT,
    "channelDescription" TEXT,
    "subscriberCount" INTEGER,
    "videoCount" INTEGER,
    "viewCount" INTEGER,
    "thumbnailUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YTChannel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "YTChannel" ADD CONSTRAINT "YTChannel_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
