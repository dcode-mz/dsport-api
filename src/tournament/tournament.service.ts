import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TournamentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTournamentDto: CreateTournamentDto) {
    const { name, description, country, logo, organizer, seasonId, sportId } =
      createTournamentDto;

    const tournament = await this.prismaService.tournament.create({
      data: { name, description, country, logo, organizer, seasonId, sportId },
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
    const { name, description, country, logo, organizer, seasonId, sportId } =
      updateTournamentDto;
    const tournament = await this.prismaService.tournament.update({
      where: { id },
      data: { name, description, country, logo, organizer, seasonId, sportId },
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

  async findTournamentsWithClubs(tournamentIds: string[]) {
    const tournaments = await this.prismaService.tournament.findMany({
      where: {
        id: {
          in: tournamentIds,
        },
      },
      include: {
        clubs: true,
      },
    });
    return tournaments;
  }
}
