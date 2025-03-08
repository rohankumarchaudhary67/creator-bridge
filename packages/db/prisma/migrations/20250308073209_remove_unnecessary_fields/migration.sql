/*
  Warnings:

  - You are about to drop the column `approvedVideos` on the `YouTubeCreator` table. All the data in the column will be lost.
  - You are about to drop the column `pendingVideos` on the `YouTubeCreator` table. All the data in the column will be lost.
  - You are about to drop the column `rejectedVideos` on the `YouTubeCreator` table. All the data in the column will be lost.
  - You are about to drop the column `approvedVideos` on the `YouTubeEditor` table. All the data in the column will be lost.
  - You are about to drop the column `pendingVideos` on the `YouTubeEditor` table. All the data in the column will be lost.
  - You are about to drop the column `rejectedVideos` on the `YouTubeEditor` table. All the data in the column will be lost.
  - You are about to drop the column `totalVideos` on the `YouTubeEditor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "YouTubeCreator" DROP COLUMN "approvedVideos",
DROP COLUMN "pendingVideos",
DROP COLUMN "rejectedVideos";

-- AlterTable
ALTER TABLE "YouTubeEditor" DROP COLUMN "approvedVideos",
DROP COLUMN "pendingVideos",
DROP COLUMN "rejectedVideos",
DROP COLUMN "totalVideos";
