/*
  Warnings:

  - You are about to drop the column `stageType` on the `stage` table. All the data in the column will be lost.
  - Added the required column `type` to the `stage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_stage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "hasMatchdays" BOOLEAN NOT NULL,
    "homeAndAway" BOOLEAN NOT NULL,
    "tournamentId" TEXT NOT NULL,
    CONSTRAINT "stage_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_stage" ("hasMatchdays", "homeAndAway", "id", "name", "order", "tournamentId") SELECT "hasMatchdays", "homeAndAway", "id", "name", "order", "tournamentId" FROM "stage";
DROP TABLE "stage";
ALTER TABLE "new_stage" RENAME TO "stage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
