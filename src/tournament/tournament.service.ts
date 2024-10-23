import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddTeamsToTournamentDto } from './dto/add-clubs-to-tournament.dto';
import { add } from 'date-fns';

@Injectable()
export class TournamentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTournamentDto: CreateTournamentDto) {
    const {
      name,
      description,
      logo,
      countryId,
      organizer,
      genderId,
      typeId,
      levelId,
      formatId,
      categoryId,
      tiebreakerCriteriaId,
      sportId,
      seasonId,
    } = createTournamentDto;

    const tournament = await this.prismaService.tournament.create({
      data: {
        name,
        description,
        logo,
        country: { connect: { id: countryId } },
        organizer,
        gender: { connect: { id: genderId } },
        type: { connect: { id: typeId } },
        level: { connect: { id: levelId } },
        format: { connect: { id: formatId } },
        category: { connect: { id: categoryId } },
        tiebreakerCriteria: { connect: { id: tiebreakerCriteriaId } },
        sport: { connect: { id: sportId } },
        season: { connect: { id: seasonId } },
      },
    });
    return tournament;
  }

  async addTeamsToTournament(addTeamsToTournamentDto: AddTeamsToTournamentDto) {
    const tournament = await this.prismaService.tournament.update({
      where: { id: addTeamsToTournamentDto.tournamentId },
      data: {
        teams: {
          connect: addTeamsToTournamentDto.teams.map((id) => ({ id })),
        },
      },
      include: {
        teams: true,
      },
    });

    return tournament;
  }

  async findAll() {
    const tournament = await this.prismaService.tournament.findMany();
    return tournament;
  }

  async findOne(id: string) {
    const tournament = await this.prismaService.tournament.findUnique({
      where: { id },
    });
    return tournament;
  }

  async update(id: string, updateTournamentDto: UpdateTournamentDto) {
    const {
      name,
      description,
      logo,
      countryId,
      organizer,
      genderId,
      typeId,
      levelId,
      formatId,
      categoryId,
      tiebreakerCriteriaId,
      sportId,
      seasonId,
    } = updateTournamentDto;
    const tournament = await this.prismaService.tournament.update({
      where: { id },
      data: {
        name,
        description,
        logo,
        country: { connect: { id: countryId } },
        organizer,
        gender: { connect: { id: genderId } },
        type: { connect: { id: typeId } },
        level: { connect: { id: levelId } },
        format: { connect: { id: formatId } },
        category: { connect: { id: categoryId } },
        tiebreakerCriteria: { connect: { id: tiebreakerCriteriaId } },
        sport: { connect: { id: sportId } },
        season: { connect: { id: seasonId } },
      },
    });
    return tournament;
  }

  async remove(id: string) {
    const tournament = await this.prismaService.tournament.delete({
      where: { id },
    });
    return tournament;
  }

  async findAllFromSportId(id: string) {
    const allTournaments = await this.prismaService.tournament.findMany({
      where: {
        sportId: id,
      },
      select: {
        id: true,
        name: true,
        logo: true,
        organizer: true,
      },
    });
    return allTournaments;
  }

  // async findTournamentsWithClubs(tournamentIds: string[]) {
  //   const tournaments = await this.prismaService.tournament.findMany({
  //     where: {
  //       id: {
  //         in: tournamentIds,
  //       },
  //     },
  //     include: {
  //       clubs: true,
  //     },
  //   });
  //   return tournaments;
  // }
}
