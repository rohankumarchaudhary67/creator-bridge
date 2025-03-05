/*
  Warnings:

  - A unique constraint covering the columns `[requestId]` on the table `VideoRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VideoRequest_requestId_key" ON "VideoRequest"("requestId");
