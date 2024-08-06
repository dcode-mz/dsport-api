import { Injectable } from '@nestjs/common';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LeagueService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createLeagueDto: CreateLeagueDto) {
    const { name, description, country, logo, organizer, seasonId, sportId } =
      createLeagueDto;

    const league = await this.prismaService.league.create({
      data: { name, description, country, logo, organizer, seasonId, sportId },
    });
    return league;
  }

  async findAll() {
    const league = await this.prismaService.league.findMany();
    return league;
  }

  async findOne(id: string) {
    const league = await this.prismaService.league.findUnique({
      where: { id },
    });
    return league;
  }

  async update(id: string, updateLeagueDto: UpdateLeagueDto) {
    const { name, description, country, logo, organizer, seasonId, sportId } =
      updateLeagueDto;
    const league = await this.prismaService.league.update({
      where: { id },
      data: { name, description, country, logo, organizer, seasonId, sportId },
    });
    return league;
  }

  async remove(id: string) {
    const league = await this.prismaService.league.delete({
      where: { id },
    });
    return league;
  }

  async findAllFromSportId(id: string) {
    const allLeagues = await this.prismaService.league.findMany(
      {
        where: {
          sportId: id
        },
        select: {
          id: true,
          name: true,
          logo: true,
          organizer: true
        }
      }
    );
    return allLeagues;
  }

  async findLeaguesWithClubs(leagueIds: string[]) {
    const leagues = await this.prismaService.league.findMany(
      {
        where: {
          id: {
            in: leagueIds,
          }
        },
        include: {
          clubs: true,
        }
      }
    );
    return leagues;
  }
}
