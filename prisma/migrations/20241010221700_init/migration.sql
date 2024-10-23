-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "user_role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user_otp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "otp" TEXT NOT NULL,
    "otpExpiry" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "user_otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
CREATE TABLE "season" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "tournament" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "countryId" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "genderId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "formatId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "tiebreakerCriteriaId" TEXT,
    "sportId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "tournament_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tournament_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "gender_type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tournament_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "tournament_type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tournament_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "tournament_level" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tournament_formatId_fkey" FOREIGN KEY ("formatId") REFERENCES "tournament_format" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tournament_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "age_category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tournament_tiebreakerCriteriaId_fkey" FOREIGN KEY ("tiebreakerCriteriaId") REFERENCES "tiebreaker_criteria" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "tournament_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "sport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tournament_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "club" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "description" TEXT,
    "logo" TEXT,
    "foundingDate" DATETIME NOT NULL,
    "website" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "team" (
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
    CONSTRAINT "team_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "coach" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "venue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "capacity" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateTime" DATETIME NOT NULL,
    "venueId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "refereeId" TEXT NOT NULL,
    "attendance" REAL NOT NULL,
    "teamTypeid" TEXT NOT NULL,
    "homeTeamId" TEXT NOT NULL,
    "awayTeamId" TEXT NOT NULL,
    "resultHomeTeam" INTEGER,
    "resultAwayTeam" INTEGER,
    "statusId" TEXT NOT NULL,
    "matchdayId" TEXT NOT NULL,
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
    CONSTRAINT "match_matchdayId_fkey" FOREIGN KEY ("matchdayId") REFERENCES "matchday" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "player_call_up_match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "playerConditionId" TEXT,
    "statusId" TEXT NOT NULL,
    "reason" TEXT,
    "isStarting" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "player_call_up_match_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_call_up_match_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_call_up_match_playerConditionId_fkey" FOREIGN KEY ("playerConditionId") REFERENCES "player_condition" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "player_call_up_match_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "call_up_status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "player_perfomance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "isMVP" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "player_perfomance_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_perfomance_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "match_stats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT NOT NULL,
    "homeScore" INTEGER NOT NULL,
    "awayScore" INTEGER NOT NULL,
    "shotsHome" INTEGER NOT NULL,
    "shotsAway" INTEGER NOT NULL,
    "possessionHome" INTEGER NOT NULL,
    "possessionAway" INTEGER NOT NULL,
    "foulsHome" INTEGER NOT NULL,
    "foulsAway" INTEGER NOT NULL,
    "yellowCardsHome" INTEGER NOT NULL,
    "yellowCardsAway" INTEGER NOT NULL,
    "redCardsHome" INTEGER NOT NULL,
    "redCardsAway" INTEGER NOT NULL,
    "cornersHome" INTEGER NOT NULL,
    "cornersAway" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "match_stats_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "hasMatchdays" BOOLEAN NOT NULL,
    "homeAndAway" BOOLEAN NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "stage_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "group" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "stageId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "group_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "stage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "matchday" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "stageId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "matchday_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "stage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nickname" TEXT,
    "positionId" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "nationality" TEXT NOT NULL,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "photoUrl" TEXT,
    "teamId" TEXT,
    "clubId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "player_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "position_field" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "player_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "club" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "player_stats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "yellowCards" INTEGER NOT NULL DEFAULT 0,
    "redCards" INTEGER NOT NULL DEFAULT 0,
    "minutesPlayed" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "player_stats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_stats_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "player_condition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerId" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "injuryDate" DATETIME,
    "returnDate" DATETIME,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "player_condition_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "player_condition_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "player_health_status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "coach" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "nationality" TEXT NOT NULL,
    "photoUrl" TEXT,
    "teamId" TEXT,
    "clubId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "coach_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "club" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "referee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "dateOfBirth" DATETIME,
    "nationality" TEXT NOT NULL,
    "photoUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "news" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publishDate" DATETIME NOT NULL,
    "author" TEXT NOT NULL,
    "clubId" TEXT,
    "playerId" TEXT,
    "tournamentId" TEXT,
    "coachId" TEXT,
    "refereeId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "news_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "club" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "news_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "news_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournament" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "news_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "coach" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "news_refereeId_fkey" FOREIGN KEY ("refereeId") REFERENCES "referee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "match_event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "typeId" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "details" TEXT,
    "matchId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "match_event_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "match_event_type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_event_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "match_event_player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "match_event_player_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "match_event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_event_player_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "national_team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "ageCategoryId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "national_team_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "national_team_ageCategoryId_fkey" FOREIGN KEY ("ageCategoryId") REFERENCES "age_category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "national_team_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "national_team_squad" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nationalTeamId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "coachId" TEXT,
    "teamId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "national_team_squad_nationalTeamId_fkey" FOREIGN KEY ("nationalTeamId") REFERENCES "national_team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "national_team_squad_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "national_team_squad_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "player_health_status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "national_team_squad_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "coach" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "national_team_squad_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "country" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo" TEXT
);

-- CreateTable
CREATE TABLE "tournament_type" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tournament_level" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tournament_format" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "age_category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "match_event_type" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "gender_type" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "format_team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "position_field" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tiebreaker_criteria" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "call_up_status" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "player_health_status" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "team_type" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "match_status" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
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

-- CreateTable
CREATE TABLE "_ClubToGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ClubToGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "club" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ClubToGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "group" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_otp_userId_key" ON "user_otp"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "sport_name_key" ON "sport"("name");

-- CreateIndex
CREATE UNIQUE INDEX "team_coachId_key" ON "team"("coachId");

-- CreateIndex
CREATE UNIQUE INDEX "_SportToUser_AB_unique" ON "_SportToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SportToUser_B_index" ON "_SportToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TournamentToUser_AB_unique" ON "_TournamentToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TournamentToUser_B_index" ON "_TournamentToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClubToTournament_AB_unique" ON "_ClubToTournament"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubToTournament_B_index" ON "_ClubToTournament"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClubToUser_AB_unique" ON "_ClubToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubToUser_B_index" ON "_ClubToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClubToGroup_AB_unique" ON "_ClubToGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubToGroup_B_index" ON "_ClubToGroup"("B");
