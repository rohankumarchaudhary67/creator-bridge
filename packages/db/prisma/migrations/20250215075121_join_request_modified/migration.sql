/*
  Warnings:

  - You are about to drop the column `receiverId` on the `JoinRequest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "JoinRequest" DROP CONSTRAINT "JoinRequest_receiverId_fkey";

-- AlterTable
ALTER TABLE "JoinRequest" DROP COLUMN "receiverId";
