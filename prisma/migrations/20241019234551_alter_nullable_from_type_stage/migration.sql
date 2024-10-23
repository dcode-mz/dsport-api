/*
  Warnings:

  - Made the column `typeId` on table `stage` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_stage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "typeId" TEXT NOT NULL,
    "hasMatchdays" BOOLEAN NOT NULL,
    "homeAndAway" BOOLEAN NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "stage_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "stage_type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stage_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_stage" ("createdAt", "hasMatchdays", "homeAndAway", "id", "name", "order", "tournamentId", "typeId", "updatedAt") SELECT "createdAt", "hasMatchdays", "homeAndAway", "id", "name", "order", "tournamentId", "typeId", "updatedAt" FROM "stage";
DROP TABLE "stage";
ALTER TABLE "new_stage" RENAME TO "stage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
