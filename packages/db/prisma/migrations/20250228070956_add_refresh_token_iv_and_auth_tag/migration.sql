/*
  Warnings:

  - You are about to drop the column `authTag` on the `UserYoutubeToken` table. All the data in the column will be lost.
  - You are about to drop the column `encryptedToken` on the `UserYoutubeToken` table. All the data in the column will be lost.
  - You are about to drop the column `iv` on the `UserYoutubeToken` table. All the data in the column will be lost.
  - Added the required column `accessAuthTag` to the `UserYoutubeToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessIv` to the `UserYoutubeToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessToken` to the `UserYoutubeToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshAuthTag` to the `UserYoutubeToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshIv` to the `UserYoutubeToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserYoutubeToken" DROP COLUMN "authTag",
DROP COLUMN "encryptedToken",
DROP COLUMN "iv",
ADD COLUMN     "accessAuthTag" TEXT NOT NULL,
ADD COLUMN     "accessIv" TEXT NOT NULL,
ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "refreshAuthTag" TEXT NOT NULL,
ADD COLUMN     "refreshIv" TEXT NOT NULL;
