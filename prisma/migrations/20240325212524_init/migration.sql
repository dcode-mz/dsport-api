-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "sport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "league" (
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
    CONSTRAINT "league_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "sport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "league_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cup" (
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
    CONSTRAINT "cup_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "sport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cup_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "season" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "club" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "foundingDate" DATETIME NOT NULL,
    "website" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateTime" DATETIME NOT NULL,
    "stadium" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "referee" TEXT NOT NULL,
    "attendance" REAL NOT NULL,
    "resultHomeTeam" INTEGER,
    "resultAwayTeam" INTEGER,
    "homeTeamId" TEXT NOT NULL,
    "awayTeamId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "clubId" TEXT,
    "leagueId" TEXT,
    "cupId" TEXT,
    CONSTRAINT "game_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "game_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "game_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "league" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "game_cupId_fkey" FOREIGN KEY ("cupId") REFERENCES "cup" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "game_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "club" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "athlete" (
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
    CONSTRAINT "athlete_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "club" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "news" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publishDate" DATETIME NOT NULL,
    "author" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "news_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_SeasonLeagues" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_SeasonLeagues_A_fkey" FOREIGN KEY ("A") REFERENCES "league" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SeasonLeagues_B_fkey" FOREIGN KEY ("B") REFERENCES "season" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_SeasonCups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_SeasonCups_A_fkey" FOREIGN KEY ("A") REFERENCES "cup" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SeasonCups_B_fkey" FOREIGN KEY ("B") REFERENCES "season" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_LeagueClubs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_LeagueClubs_A_fkey" FOREIGN KEY ("A") REFERENCES "club" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LeagueClubs_B_fkey" FOREIGN KEY ("B") REFERENCES "league" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CupClub" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CupClub_A_fkey" FOREIGN KEY ("A") REFERENCES "club" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CupClub_B_fkey" FOREIGN KEY ("B") REFERENCES "cup" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_SportClub" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_SportClub_A_fkey" FOREIGN KEY ("A") REFERENCES "club" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SportClub_B_fkey" FOREIGN KEY ("B") REFERENCES "sport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_SeasonLeagues_AB_unique" ON "_SeasonLeagues"("A", "B");

-- CreateIndex
CREATE INDEX "_SeasonLeagues_B_index" ON "_SeasonLeagues"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SeasonCups_AB_unique" ON "_SeasonCups"("A", "B");

-- CreateIndex
CREATE INDEX "_SeasonCups_B_index" ON "_SeasonCups"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LeagueClubs_AB_unique" ON "_LeagueClubs"("A", "B");

-- CreateIndex
CREATE INDEX "_LeagueClubs_B_index" ON "_LeagueClubs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CupClub_AB_unique" ON "_CupClub"("A", "B");

-- CreateIndex
CREATE INDEX "_CupClub_B_index" ON "_CupClub"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SportClub_AB_unique" ON "_SportClub"("A", "B");

-- CreateIndex
CREATE INDEX "_SportClub_B_index" ON "_SportClub"("B");
