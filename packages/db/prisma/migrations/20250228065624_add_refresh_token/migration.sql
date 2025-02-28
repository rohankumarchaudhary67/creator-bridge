/*
  Warnings:

  - Added the required column `refreshToken` to the `UserYoutubeToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserYoutubeToken" ADD COLUMN     "refreshToken" TEXT NOT NULL;
