/*
  Warnings:

  - You are about to drop the `_CupClub` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LeagueClubs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SeasonCups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SeasonLeagues` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SportClub` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserSport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `league` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `clubId` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `cupId` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `leagueId` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `season` table. All the data in the column will be lost.
  - You are about to drop the column `otp` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `otpExpiry` on the `users` table. All the data in the column will be lost.
  - Added the required column `matchdayId` to the `game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonId` to the `game` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_CupClub_B_index";

-- DropIndex
DROP INDEX "_CupClub_AB_unique";

-- DropIndex
DROP INDEX "_LeagueClubs_B_index";

-- DropIndex
DROP INDEX "_LeagueClubs_AB_unique";

-- DropIndex
DROP INDEX "_SeasonCups_B_index";

-- DropIndex
DROP INDEX "_SeasonCups_AB_unique";

-- DropIndex
DROP INDEX "_SeasonLeagues_B_index";

-- DropIndex
DROP INDEX "_SeasonLeagues_AB_unique";

-- DropIndex
DROP INDEX "_SportClub_B_index";

-- DropIndex
DROP INDEX "_SportClub_AB_unique";

-- DropIndex
DROP INDEX "_UserSport_B_index";

-- DropIndex
DROP INDEX "_UserSport_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CupClub";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_LeagueClubs";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_SeasonCups";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_SeasonLeagues";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_SportClub";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UserSport";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "cup";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "league";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "user_otp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "otp" TEXT NOT NULL,
    "otpExpiry" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "user_otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tournament" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "country" TEXT NOT NULL DEFAULT 'Mozambique',
    "organizer" TEXT NOT NULL,
    "sportId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "tournament_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "sport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tournament_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "matchday" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    CONSTRAINT "matchday_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "matchday_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_SportToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_SportToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "sport" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SportToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TournamentToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TournamentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "tournament" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TournamentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ClubToSport" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ClubToSport_A_fkey" FOREIGN KEY ("A") REFERENCES "club" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ClubToSport_B_fkey" FOREIGN KEY ("B") REFERENCES "sport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ClubToTournament" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ClubToTournament_A_fkey" FOREIGN KEY ("A") REFERENCES "club" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ClubToTournament_B_fkey" FOREIGN KEY ("B") REFERENCES "tournament" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ClubToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ClubToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "club" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ClubToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_game" (
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
    "tournamentId" TEXT,
    "matchdayId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "game_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "game_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "game_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournament" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "game_matchdayId_fkey" FOREIGN KEY ("matchdayId") REFERENCES "matchday" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "game_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_game" ("attendance", "awayTeamId", "createdAt", "dateTime", "homeTeamId", "id", "location", "referee", "resultAwayTeam", "resultHomeTeam", "stadium", "updatedAt") SELECT "attendance", "awayTeamId", "createdAt", "dateTime", "homeTeamId", "id", "location", "referee", "resultAwayTeam", "resultHomeTeam", "stadium", "updatedAt" FROM "game";
DROP TABLE "game";
ALTER TABLE "new_game" RENAME TO "game";
CREATE TABLE "new_season" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '2022',
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_season" ("createdAt", "endDate", "id", "startDate", "updatedAt") SELECT "createdAt", "endDate", "id", "startDate", "updatedAt" FROM "season";
DROP TABLE "season";
ALTER TABLE "new_season" RENAME TO "season";
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_users" ("createdAt", "email", "id", "name", "password", "updatedAt") SELECT "createdAt", "email", "id", "name", "password", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "user_otp_userId_key" ON "user_otp"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_SportToUser_AB_unique" ON "_SportToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SportToUser_B_index" ON "_SportToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TournamentToUser_AB_unique" ON "_TournamentToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TournamentToUser_B_index" ON "_TournamentToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClubToSport_AB_unique" ON "_ClubToSport"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubToSport_B_index" ON "_ClubToSport"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClubToTournament_AB_unique" ON "_ClubToTournament"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubToTournament_B_index" ON "_ClubToTournament"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClubToUser_AB_unique" ON "_ClubToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubToUser_B_index" ON "_ClubToUser"("B");
