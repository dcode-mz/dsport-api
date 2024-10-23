/*
  Warnings:

  - You are about to alter the column `attendance` on the `match` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - You are about to drop the column `type` on the `stage` table. All the data in the column will be lost.
  - Added the required column `role` to the `match_event_player` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "league_standing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tournamentId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "played" INTEGER NOT NULL DEFAULT 0,
    "won" INTEGER NOT NULL DEFAULT 0,
    "drawn" INTEGER NOT NULL DEFAULT 0,
    "lost" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,
    "goalsFor" INTEGER NOT NULL DEFAULT 0,
    "goalsAgainst" INTEGER NOT NULL DEFAULT 0,
    "goalDifference" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "league_standing_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "league_standing_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stage_type" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateTime" DATETIME NOT NULL,
    "venueId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "refereeId" TEXT NOT NULL,
    "attendance" INTEGER NOT NULL,
    "teamTypeid" TEXT NOT NULL,
    "homeTeamId" TEXT NOT NULL,
    "awayTeamId" TEXT NOT NULL,
    "resultHomeTeam" INTEGER,
    "resultAwayTeam" INTEGER,
    "statusId" TEXT NOT NULL,
    "matchdayId" TEXT,
    "numberPeriods" INTEGER NOT NULL,
    "durationPerPeriod" INTEGER NOT NULL,
    "halfTimeDuration" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "match_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_refereeId_fkey" FOREIGN KEY ("refereeId") REFERENCES "referee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_teamTypeid_fkey" FOREIGN KEY ("teamTypeid") REFERENCES "team_type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "match_status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_matchdayId_fkey" FOREIGN KEY ("matchdayId") REFERENCES "matchday" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_match" ("attendance", "awayTeamId", "createdAt", "dateTime", "durationPerPeriod", "halfTimeDuration", "homeTeamId", "id", "location", "matchdayId", "numberPeriods", "refereeId", "resultAwayTeam", "resultHomeTeam", "statusId", "teamTypeid", "updatedAt", "venueId") SELECT "attendance", "awayTeamId", "createdAt", "dateTime", "durationPerPeriod", "halfTimeDuration", "homeTeamId", "id", "location", "matchdayId", "numberPeriods", "refereeId", "resultAwayTeam", "resultHomeTeam", "statusId", "teamTypeid", "updatedAt", "venueId" FROM "match";
DROP TABLE "match";
ALTER TABLE "new_match" RENAME TO "match";
CREATE TABLE "new_match_event_player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "match_event_player_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "match_event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_event_player_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_match_event_player" ("createdAt", "eventId", "id", "playerId", "updatedAt") SELECT "createdAt", "eventId", "id", "playerId", "updatedAt" FROM "match_event_player";
DROP TABLE "match_event_player";
ALTER TABLE "new_match_event_player" RENAME TO "match_event_player";
CREATE TABLE "new_stage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "typeId" TEXT,
    "hasMatchdays" BOOLEAN NOT NULL,
    "homeAndAway" BOOLEAN NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "stage_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "stage_type" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "stage_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_stage" ("createdAt", "hasMatchdays", "homeAndAway", "id", "name", "order", "tournamentId", "updatedAt") SELECT "createdAt", "hasMatchdays", "homeAndAway", "id", "name", "order", "tournamentId", "updatedAt" FROM "stage";
DROP TABLE "stage";
ALTER TABLE "new_stage" RENAME TO "stage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
