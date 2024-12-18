/*
  Warnings:

  - A unique constraint covering the columns `[captainId]` on the table `team` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[viceCaptainId]` on the table `team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "team_captainId_key" ON "team"("captainId");

-- CreateIndex
CREATE UNIQUE INDEX "team_viceCaptainId_key" ON "team"("viceCaptainId");
