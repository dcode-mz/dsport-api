/*
  Warnings:

  - You are about to drop the column `name` on the `formation_scheme` table. All the data in the column will be lost.
  - Added the required column `formation` to the `formation_scheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `formation_scheme` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_formation_scheme" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "formation" TEXT NOT NULL,
    "label" TEXT NOT NULL
);
INSERT INTO "new_formation_scheme" ("id") SELECT "id" FROM "formation_scheme";
DROP TABLE "formation_scheme";
ALTER TABLE "new_formation_scheme" RENAME TO "formation_scheme";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
