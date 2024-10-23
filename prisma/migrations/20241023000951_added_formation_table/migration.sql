/*
  Warnings:

  - You are about to drop the `call_up_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `player_call_up_match` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `league_standing` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "call_up_status";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "player_call_up_match";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "tactical_formation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "formationSchemeId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "tactical_formation_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tactical_formation_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tactical_formation_formationSchemeId_fkey" FOREIGN KEY ("formationSchemeId") REFERENCES "formation_scheme" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "player_convocation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "playerConditionId" TEXT,
    "calledUp" BOOLEAN NOT NULL DEFAULT false,
    "absenceReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "player_convocation_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_convocation_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_convocation_playerConditionId_fkey" FOREIGN KEY ("playerConditionId") REFERENCES "player_condition" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "player_position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matchId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    "formationId" TEXT NOT NULL,
    "starter" BOOLEAN NOT NULL DEFAULT false,
    "onField" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "player_position_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_position_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_position_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_position_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "position_field" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_position_formationId_fkey" FOREIGN KEY ("formationId") REFERENCES "tactical_formation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "formation_scheme" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_country" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_country" ("id", "logo", "name") SELECT "id", "logo", "name" FROM "country";
DROP TABLE "country";
ALTER TABLE "new_country" RENAME TO "country";
CREATE TABLE "new_league_standing" (
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "league_standing_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "league_standing_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_league_standing" ("drawn", "goalDifference", "goalsAgainst", "goalsFor", "id", "lost", "played", "points", "teamId", "tournamentId", "won") SELECT "drawn", "goalDifference", "goalsAgainst", "goalsFor", "id", "lost", "played", "points", "teamId", "tournamentId", "won" FROM "league_standing";
DROP TABLE "league_standing";
ALTER TABLE "new_league_standing" RENAME TO "league_standing";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
