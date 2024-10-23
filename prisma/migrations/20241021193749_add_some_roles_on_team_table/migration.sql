/*
  Warnings:

  - You are about to drop the column `clubId` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `player` table. All the data in the column will be lost.
  - Added the required column `primaryNationalityId` to the `player` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nickname" TEXT,
    "positionId" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "primaryNationalityId" TEXT NOT NULL,
    "jersey_number_club" INTEGER,
    "jersey_number_national" INTEGER,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "photoUrl" TEXT,
    "teamId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "player_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "position_field" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_primaryNationalityId_fkey" FOREIGN KEY ("primaryNationalityId") REFERENCES "country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_player" ("createdAt", "dateOfBirth", "height", "id", "name", "nickname", "photoUrl", "positionId", "teamId", "updatedAt", "weight") SELECT "createdAt", "dateOfBirth", "height", "id", "name", "nickname", "photoUrl", "positionId", "teamId", "updatedAt", "weight" FROM "player";
DROP TABLE "player";
ALTER TABLE "new_player" RENAME TO "player";
CREATE TABLE "new_team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "genderId" TEXT NOT NULL,
    "teamTypeId" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "contact" TEXT,
    "location" TEXT,
    "clubId" TEXT NOT NULL,
    "sportId" TEXT NOT NULL,
    "ageCategoryId" TEXT NOT NULL,
    "formatId" TEXT,
    "captainId" TEXT,
    "viceCaptainId" TEXT,
    "coachId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "team_teamTypeId_fkey" FOREIGN KEY ("teamTypeId") REFERENCES "team_type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "team_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "gender_type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "team_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "team_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "team_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "sport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "team_ageCategoryId_fkey" FOREIGN KEY ("ageCategoryId") REFERENCES "age_category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "team_formatId_fkey" FOREIGN KEY ("formatId") REFERENCES "format_team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "team_captainId_fkey" FOREIGN KEY ("captainId") REFERENCES "player" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "team_viceCaptainId_fkey" FOREIGN KEY ("viceCaptainId") REFERENCES "player" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "team_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "coach" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_team" ("ageCategoryId", "clubId", "coachId", "contact", "createdAt", "formatId", "genderId", "id", "location", "name", "sportId", "teamTypeId", "updatedAt", "venueId") SELECT "ageCategoryId", "clubId", "coachId", "contact", "createdAt", "formatId", "genderId", "id", "location", "name", "sportId", "teamTypeId", "updatedAt", "venueId" FROM "team";
DROP TABLE "team";
ALTER TABLE "new_team" RENAME TO "team";
CREATE UNIQUE INDEX "team_coachId_key" ON "team"("coachId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
