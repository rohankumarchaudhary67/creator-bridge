/*
  Warnings:

  - You are about to drop the column `accessTokenn` on the `YTCreator` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `YTCreator` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "YTCreator" DROP COLUMN "accessTokenn",
DROP COLUMN "refreshToken";

-- CreateTable
CREATE TABLE "UserYoutubeToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "encryptedToken" TEXT NOT NULL,
    "iv" TEXT NOT NULL,
    "authTag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserYoutubeToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserYoutubeToken" ADD CONSTRAINT "UserYoutubeToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
