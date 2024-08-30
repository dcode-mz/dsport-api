/*
  Warnings:

  - You are about to drop the `athlete` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `seasonId` on the `matchday` table. All the data in the column will be lost.
  - You are about to drop the column `tournamentId` on the `matchday` table. All the data in the column will be lost.
  - Added the required column `stageId` to the `matchday` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "athlete";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "game";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateTime" DATETIME NOT NULL,
    "stadium" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "referee" TEXT NOT NULL,
    "attendance" REAL NOT NULL,
    "homeTeamId" TEXT NOT NULL,
    "awayTeamId" TEXT NOT NULL,
    "resultHomeTeam" INTEGER,
    "resultAwayTeam" INTEGER,
    "matchdayId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "match_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_matchdayId_fkey" FOREIGN KEY ("matchdayId") REFERENCES "matchday" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "stageType" TEXT NOT NULL,
    "hasMatchdays" BOOLEAN NOT NULL,
    "homeAndAway" BOOLEAN NOT NULL,
    "tournamentId" TEXT NOT NULL,
    CONSTRAINT "stage_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "group" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "stageId" TEXT NOT NULL,
    CONSTRAINT "group_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "stage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "nationality" TEXT NOT NULL,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "photoUrl" TEXT,
    "clubId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "player_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "club" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_club" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "description" TEXT,
    "logo" TEXT,
    "stadium" TEXT,
    "location" TEXT,
    "foundingDate" DATETIME NOT NULL,
    "website" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "groupId" TEXT,
    CONSTRAINT "club_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_club" ("createdAt", "description", "foundingDate", "id", "logo", "name", "shortName", "updatedAt", "website") SELECT "createdAt", "description", "foundingDate", "id", "logo", "name", "shortName", "updatedAt", "website" FROM "club";
DROP TABLE "club";
ALTER TABLE "new_club" RENAME TO "club";
CREATE TABLE "new_matchday" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "stageId" TEXT NOT NULL,
    CONSTRAINT "matchday_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "stage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_matchday" ("id", "number") SELECT "id", "number" FROM "matchday";
DROP TABLE "matchday";
ALTER TABLE "new_matchday" RENAME TO "matchday";
CREATE TABLE "new_news" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publishDate" DATETIME NOT NULL,
    "author" TEXT NOT NULL,
    "clubId" TEXT,
    "playerId" TEXT,
    "tournamentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "news_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "club" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "news_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "news_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournament" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_news" ("author", "clubId", "content", "createdAt", "id", "publishDate", "title", "updatedAt") SELECT "author", "clubId", "content", "createdAt", "id", "publishDate", "title", "updatedAt" FROM "news";
DROP TABLE "news";
ALTER TABLE "new_news" RENAME TO "news";
CREATE TABLE "new_tournament" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "country" TEXT NOT NULL DEFAULT 'Mozambique',
    "organizer" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'League',
    "sportId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "tournament_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "sport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tournament_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tournament" ("country", "createdAt", "description", "id", "logo", "name", "organizer", "seasonId", "sportId", "updatedAt") SELECT "country", "createdAt", "description", "id", "logo", "name", "organizer", "seasonId", "sportId", "updatedAt" FROM "tournament";
DROP TABLE "tournament";
ALTER TABLE "new_tournament" RENAME TO "tournament";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
