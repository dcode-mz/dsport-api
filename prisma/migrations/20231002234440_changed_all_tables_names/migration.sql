/*
  Warnings:

  - You are about to drop the `Athlete` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Club` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `League` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `News` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Season` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Athlete` DROP FOREIGN KEY `Athlete_clubId_fkey`;

-- DropForeignKey
ALTER TABLE `Cup` DROP FOREIGN KEY `Cup_seasonId_fkey`;

-- DropForeignKey
ALTER TABLE `Cup` DROP FOREIGN KEY `Cup_sportId_fkey`;

-- DropForeignKey
ALTER TABLE `Game` DROP FOREIGN KEY `Game_awayTeamClubId_fkey`;

-- DropForeignKey
ALTER TABLE `Game` DROP FOREIGN KEY `Game_clubId_fkey`;

-- DropForeignKey
ALTER TABLE `Game` DROP FOREIGN KEY `Game_cupId_fkey`;

-- DropForeignKey
ALTER TABLE `Game` DROP FOREIGN KEY `Game_homeTeamClubId_fkey`;

-- DropForeignKey
ALTER TABLE `Game` DROP FOREIGN KEY `Game_leagueId_fkey`;

-- DropForeignKey
ALTER TABLE `League` DROP FOREIGN KEY `League_seasonId_fkey`;

-- DropForeignKey
ALTER TABLE `League` DROP FOREIGN KEY `League_sportId_fkey`;

-- DropForeignKey
ALTER TABLE `News` DROP FOREIGN KEY `News_clubId_fkey`;

-- DropForeignKey
ALTER TABLE `_CupClub` DROP FOREIGN KEY `_CupClub_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CupClub` DROP FOREIGN KEY `_CupClub_B_fkey`;

-- DropForeignKey
ALTER TABLE `_LeagueClubs` DROP FOREIGN KEY `_LeagueClubs_A_fkey`;

-- DropForeignKey
ALTER TABLE `_LeagueClubs` DROP FOREIGN KEY `_LeagueClubs_B_fkey`;

-- DropForeignKey
ALTER TABLE `_SeasonCups` DROP FOREIGN KEY `_SeasonCups_A_fkey`;

-- DropForeignKey
ALTER TABLE `_SeasonCups` DROP FOREIGN KEY `_SeasonCups_B_fkey`;

-- DropForeignKey
ALTER TABLE `_SeasonLeagues` DROP FOREIGN KEY `_SeasonLeagues_A_fkey`;

-- DropForeignKey
ALTER TABLE `_SeasonLeagues` DROP FOREIGN KEY `_SeasonLeagues_B_fkey`;

-- DropForeignKey
ALTER TABLE `_SportClub` DROP FOREIGN KEY `_SportClub_A_fkey`;

-- DropForeignKey
ALTER TABLE `_SportClub` DROP FOREIGN KEY `_SportClub_B_fkey`;

-- DropTable
DROP TABLE `Athlete`;

-- DropTable
DROP TABLE `Club`;

-- DropTable
DROP TABLE `Cup`;

-- DropTable
DROP TABLE `Game`;

-- DropTable
DROP TABLE `League`;

-- DropTable
DROP TABLE `News`;

-- DropTable
DROP TABLE `Season`;

-- DropTable
DROP TABLE `Sport`;

-- CreateTable
CREATE TABLE `sport` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `league` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `country` VARCHAR(191) NOT NULL DEFAULT 'Mozambique',
    `organizer` VARCHAR(191) NOT NULL,
    `sportId` VARCHAR(191) NOT NULL,
    `seasonId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cup` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `country` VARCHAR(191) NOT NULL DEFAULT 'Mozambique',
    `organizer` VARCHAR(191) NOT NULL,
    `sportId` VARCHAR(191) NOT NULL,
    `seasonId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `season` (
    `id` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `club` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `foundingDate` DATETIME(3) NOT NULL,
    `website` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `game` (
    `id` VARCHAR(191) NOT NULL,
    `dateTime` DATETIME(3) NOT NULL,
    `stadium` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `referee` VARCHAR(191) NOT NULL,
    `attendance` DOUBLE NOT NULL,
    `resultHomeTeam` INTEGER NOT NULL,
    `resultAwayTeam` INTEGER NOT NULL,
    `homeTeamClubId` VARCHAR(191) NOT NULL,
    `awayTeamClubId` VARCHAR(191) NOT NULL,
    `leagueId` VARCHAR(191) NULL,
    `cupId` VARCHAR(191) NULL,
    `clubId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `athlete` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `height` DOUBLE NOT NULL,
    `weight` DOUBLE NOT NULL,
    `photoUrl` VARCHAR(191) NULL,
    `clubId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `publishDate` DATETIME(3) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `clubId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `league` ADD CONSTRAINT `league_sportId_fkey` FOREIGN KEY (`sportId`) REFERENCES `sport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `league` ADD CONSTRAINT `league_seasonId_fkey` FOREIGN KEY (`seasonId`) REFERENCES `season`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cup` ADD CONSTRAINT `cup_sportId_fkey` FOREIGN KEY (`sportId`) REFERENCES `sport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cup` ADD CONSTRAINT `cup_seasonId_fkey` FOREIGN KEY (`seasonId`) REFERENCES `season`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game` ADD CONSTRAINT `game_homeTeamClubId_fkey` FOREIGN KEY (`homeTeamClubId`) REFERENCES `club`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game` ADD CONSTRAINT `game_awayTeamClubId_fkey` FOREIGN KEY (`awayTeamClubId`) REFERENCES `club`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game` ADD CONSTRAINT `game_leagueId_fkey` FOREIGN KEY (`leagueId`) REFERENCES `league`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game` ADD CONSTRAINT `game_cupId_fkey` FOREIGN KEY (`cupId`) REFERENCES `cup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game` ADD CONSTRAINT `game_clubId_fkey` FOREIGN KEY (`clubId`) REFERENCES `club`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `athlete` ADD CONSTRAINT `athlete_clubId_fkey` FOREIGN KEY (`clubId`) REFERENCES `club`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `news` ADD CONSTRAINT `news_clubId_fkey` FOREIGN KEY (`clubId`) REFERENCES `club`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SeasonLeagues` ADD CONSTRAINT `_SeasonLeagues_A_fkey` FOREIGN KEY (`A`) REFERENCES `league`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SeasonLeagues` ADD CONSTRAINT `_SeasonLeagues_B_fkey` FOREIGN KEY (`B`) REFERENCES `season`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SeasonCups` ADD CONSTRAINT `_SeasonCups_A_fkey` FOREIGN KEY (`A`) REFERENCES `cup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SeasonCups` ADD CONSTRAINT `_SeasonCups_B_fkey` FOREIGN KEY (`B`) REFERENCES `season`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LeagueClubs` ADD CONSTRAINT `_LeagueClubs_A_fkey` FOREIGN KEY (`A`) REFERENCES `club`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LeagueClubs` ADD CONSTRAINT `_LeagueClubs_B_fkey` FOREIGN KEY (`B`) REFERENCES `league`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CupClub` ADD CONSTRAINT `_CupClub_A_fkey` FOREIGN KEY (`A`) REFERENCES `club`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CupClub` ADD CONSTRAINT `_CupClub_B_fkey` FOREIGN KEY (`B`) REFERENCES `cup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SportClub` ADD CONSTRAINT `_SportClub_A_fkey` FOREIGN KEY (`A`) REFERENCES `club`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SportClub` ADD CONSTRAINT `_SportClub_B_fkey` FOREIGN KEY (`B`) REFERENCES `sport`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
