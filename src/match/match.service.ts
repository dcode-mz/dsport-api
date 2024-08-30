import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { ClubService } from 'src/club/club.service';
import { ClubDto } from './dto/club.dto';
import { PrismaService } from 'src/prisma/prisma.service';

class FixturesDto {
  round: number;
  matches: { homeClub: ClubDto; awayClub: ClubDto }[];
}

@Injectable()
export class MatchService {
  constructor(
    private readonly clubService: ClubService,
    private readonly prismaService: PrismaService,
  ) {}

  create(createMatchDto: CreateMatchDto) {
    return 'This action adds a new match';
  }

  findAll() {
    return `This action returns all match`;
  }

  findOne(id: number) {
    return `This action returns a #${id} match`;
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }

  //
  private getRandomOrder(array: ClubDto[]): ClubDto[] {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private generateRoundMatches(
    order: ClubDto[],
  ): { homeClub: ClubDto; awayClub: ClubDto }[] {
    const roundMatches = [];
    const numClubs = order.length;
    for (let i = 0; i < numClubs / 2; i++) {
      const homeClub = order[i];
      const awayClub = order[numClubs - 1 - i];
      if (homeClub !== awayClub) {
        roundMatches.push({ homeClub, awayClub });
      }
    }
    return roundMatches;
  }

  private uniqueMatches(
    matches: { homeClub: ClubDto; awayClub: ClubDto }[],
  ): boolean {
    const matchSet = new Set(
      matches.map((m) => [m.homeClub.name, m.awayClub.name].sort().join('-')),
    );
    return matchSet.size === matches.length;
  }

  private async generateFixtures(idSport: string): Promise<FixturesDto[]> {
    const clubs = await this.clubService.findBySport(idSport);
    const numClubs = clubs.length;
    const fixtures: FixturesDto[] = [];
    // const allMatches: { homeClub: string; awayClub: string }[] = [];

    for (let round = 0; round < numClubs - 1; round++) {
      let roundMatches;
      do {
        const randomOrder = this.getRandomOrder(clubs);
        roundMatches = this.generateRoundMatches(randomOrder);
      } while (!this.uniqueMatches(roundMatches));
      fixtures.push({ round: round + 1, matches: roundMatches });
    }

    const secondHalfFixtures = fixtures.map(({ round, matches }) => ({
      round: round + numClubs - 1,
      matches: matches.map(({ homeClub, awayClub }) => ({
        homeClub: awayClub,
        awayClub: homeClub,
      })),
    }));

    fixtures.push(...secondHalfFixtures);

    return fixtures;
  }

  async generateMatchday(
    idSport: string,
    idSeason: string,
    tournamentId: string,
  ) {
    const fixtures: FixturesDto[] = await this.generateFixtures(idSport);

    const startDate = new Date(new Date().getFullYear(), 0, 1); // Início do ano
    const endDate = new Date(new Date().getFullYear(), 11, 31); // Final do ano
    const roundDuration = Math.floor(
      (endDate.getTime() - startDate.getTime()) / fixtures.length,
    ); // Dividir o tempo ao longo das rodadas

    //
    // Verifique se o estágio já existe
    const existingStage = await this.prismaService.stage.findFirst({
      where: {
        tournament: {
          id: tournamentId,
          season: {
            id: idSeason,
          },
        }, // Assumindo que você pode identificar um estágio com base no torneio
        name: 'Regular Season',
      },
    });

    // Se não existir, crie o estágio
    const stageId =
      existingStage?.id ||
      (
        await this.prismaService.stage.create({
          data: {
            name: 'Regular Season',
            order: 1,
            type: 'League',
            hasMatchdays: true,
            homeAndAway: false,
            tournament: {
              connect: {
                id: tournamentId,
              },
            },
          },
        })
      ).id;
    //

    // Transformando a criação dos jogos em um mapeamento para evitar uso de forEach com async
    const matchPromises = fixtures.flatMap((fixture) =>
      fixture.matches.map((match) =>
        this.prismaService.match.create({
          data: {
            dateTime: new Date(
              startDate.getTime() + fixture.round * roundDuration,
            ),
            stadium: match.awayClub.stadium,
            location: match.homeClub.location,
            referee: 'João Silva',
            attendance: 25000,
            homeTeam: {
              connect: { id: match.homeClub.id },
            },
            awayTeam: {
              connect: { id: match.awayClub.id },
            },
            matchday: {
              create: {
                number: fixture.round,
                stage: {
                  connect: {
                    id: stageId,
                  },
                },
              },
            },
          },
        }),
      ),
    );

    // Executando todas as promessas de criação dos jogos simultaneamente
    await Promise.all(matchPromises);
  }
}
