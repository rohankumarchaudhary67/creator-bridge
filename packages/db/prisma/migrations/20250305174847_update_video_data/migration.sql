-- AlterTable
ALTER TABLE "YouTubeVideo" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
