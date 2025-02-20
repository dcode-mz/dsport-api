import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
// import { ClubService } from 'src/club/club.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { GenerateFixturesDto } from './dto/generate-fixtures.dto';
// import { TeamService } from 'src/team/team.service';
import { TeamDto } from './dto/team.dto';
import { ResponseBody } from 'src/common/dto/ResponseBody';
import { MatchDetailsDto } from './dto/match-details.dto';

class FixturesDto {
  round: number;
  matches: { homeTeam: TeamDto; awayTeam: TeamDto }[];
}

@Injectable()
export class MatchService {
  constructor(
    // private readonly clubService: ClubService,
    // private readonly teamService: TeamService,
    private readonly prismaService: PrismaService,
  ) {}

  create(createMatchDto: CreateMatchDto) {
    return 'This action adds a new match';
  }

  findAll() {
    return this.prismaService.match.findMany();
  }

  findOne(id: string) {
    return this.prismaService.match.findFirst({
      where: { id: id },
    });
  }

  async findOneMatchDetails(
    id: string,
  ): Promise<ResponseBody<MatchDetailsDto>> {
    const matchDetails = await this.prismaService.match.findFirst({
      where: { id: id },
      select: {
        id: true,
        dateTime: true,
        venue: {
          select: { id: true, name: true, location: true, capacity: true },
        },
        referee: {
          select: {
            id: true,
            name: true,
            photoUrl: true,
            nationality: { select: { id: true, name: true, logo: true } },
          },
        },
        attendance: true,
        teamType: { select: { id: true, name: true } },
        homeTeam: {
          select: {
            id: true,
            club: {
              select: { id: true, name: true, logo: true, shortName: true },
            },
            gender: { select: { id: true, name: true } },
            players: {
              select: {
                id: true,
                name: true,
                nickname: true,
                jersey_number_club: true,
                photoUrl: true,
              },
              where: {
                convocations: { every: { matchId: id, calledUp: true } },
              },
            },
          },
        },
        awayTeam: {
          select: {
            id: true,
            club: {
              select: { id: true, name: true, logo: true, shortName: true },
            },
            gender: { select: { id: true, name: true } },
            players: {
              select: {
                id: true,
                name: true,
                nickname: true,
                jersey_number_club: true,
                photoUrl: true,
              },
            },
          },
        },
        resultHomeTeam: true,
        resultAwayTeam: true,
        status: { select: { id: true, name: true } },
        matchday: { select: { id: true, number: true } },
        numberPeriods: true,
        durationPerPeriod: true,
        halfTimeDuration: true,
        matchStats: {
          select: {
            id: true,
            homeScore: true,
            awayScore: true,
            shotsHome: true,
            shotsAway: true,
            possessionHome: true,
            possessionAway: true,
            foulsHome: true,
            foulsAway: true,
            yellowCardsHome: true,
            yellowCardsAway: true,
            redCardsHome: true,
            redCardsAway: true,
            cornersHome: true,
            cornersAway: true,
          },
        },
        // playerStats: { select: { id: true, player: { select: { id: true, }},  } }
        events: {
          select: {
            id: true,
            type: { select: { id: true, name: true } },
            time: true,
            details: true,
            players: {
              select: {
                id: true,
                player: {
                  select: {
                    id: true,
                    name: true,
                    team: {
                      select: {
                        id: true,
                        club: { select: { id: true, name: true } },
                      },
                    },
                  },
                },
                role: true,
              },
            },
          },
        },
        perfomances: {
          select: {
            id: true,
            player: { select: { id: true, name: true, photoUrl: true } },
            isMVP: true,
            score: true,
          },
        },
        convocations: {
          select: {
            id: true,
            player: { select: { id: true, name: true, photoUrl: true } },
            playerCondition: {
              select: {
                status: { select: { id: true, name: true } },
                injuryDate: true,
                returnDate: true,
                notes: true,
              },
            },
            calledUp: true,
            absenceReason: true,
          },
        },
        formations: {
          select: {
            id: true,
            team: { select: { id: true, name: true } },
            formationScheme: {
              select: { id: true, formation: true, label: true },
            },
            positions: {
              select: {
                id: true,
                team: { select: { id: true, name: true } },
                player: { select: { id: true, name: true } },
                starter: true,
                onField: true,
              },
              where: { matchId: id },
            },
          },
          where: { matchId: id },
        },
      },
    });

    const response = new ResponseBody<MatchDetailsDto>(
      'Consulta do detalhe do jogo feita com sucesso',
      matchDetails,
      true,
    );
    return response;
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }

  //
  private getRandomOrder(array: TeamDto[]): TeamDto[] {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private generateRoundMatches(
    order: TeamDto[],
  ): { homeTeam: TeamDto; awayTeam: TeamDto }[] {
    const roundMatches = [];
    const numTeams = order.length;
    for (let i = 0; i < numTeams / 2; i++) {
      const homeTeam = order[i];
      const awayTeam = order[numTeams - 1 - i];
      if (homeTeam !== awayTeam) {
        roundMatches.push({ homeTeam, awayTeam });
      }
    }
    return roundMatches;
  }

  private uniqueMatches(
    matches: { homeTeam: TeamDto; awayTeam: TeamDto }[],
  ): boolean {
    const matchSet = new Set(
      matches.map((m) =>
        [(m.homeTeam.club.name, m.awayTeam.club.name)].sort().join('-'),
      ),
    );
    return matchSet.size === matches.length;
  }

  private async generateFixtures(tournamentId: string): Promise<FixturesDto[]> {
    const teams: TeamDto[] = await this.prismaService.team.findMany({
      where: { tournaments: { every: { id: tournamentId } } },
      include: {
        club: {
          select: {
            id: true,
            name: true,
            shortName: true,
            description: true,
            logo: true,
            foundingDate: true,
            website: true,
          },
        },
        teamType: {
          select: {
            id: true,
            name: true,
          },
        },
        venue: {
          select: {
            id: true,
            name: true,
            location: true,
            capacity: true,
          },
        },
        sport: {
          select: {
            id: true,
            name: true,
            icon: true,
            description: true,
          },
        },
        ageCategory: {
          select: {
            id: true,
            name: true,
          },
        },
        format: {
          select: {
            id: true,
            name: true,
          },
        },
        gender: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const numTeams = teams.length;
    const fixtures: FixturesDto[] = [];

    for (let round = 0; round < numTeams - 1; round++) {
      let roundMatches;
      do {
        const randomOrder = this.getRandomOrder(teams);
        roundMatches = this.generateRoundMatches(randomOrder);
      } while (!this.uniqueMatches(roundMatches));
      fixtures.push({ round: round + 1, matches: roundMatches });
    }

    const secondHalfFixtures = fixtures.map(({ round, matches }) => ({
      round: round + numTeams - 1,
      matches: matches.map(({ homeTeam, awayTeam }) => ({
        homeTeam: awayTeam,
        awayTeam: homeTeam,
      })),
    }));

    fixtures.push(...secondHalfFixtures);

    return fixtures;
  }

  async generateMatchday(generateFixturesDto: GenerateFixturesDto) {
    const fixtures: FixturesDto[] = await this.generateFixtures(
      generateFixturesDto.tournamentId,
    );

    const startDate = new Date(new Date().getFullYear(), 0, 1);
    const endDate = new Date(new Date().getFullYear(), 11, 31);
    const roundDuration = Math.floor(
      (endDate.getTime() - startDate.getTime()) / fixtures.length,
    );

    const existingStage = await this.prismaService.stage.findFirst({
      where: {
        tournament: {
          id: generateFixturesDto.tournamentId,
          season: {
            id: generateFixturesDto.seasonId,
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
            type: { connect: { id: 'e298fd0d-2b62-42f1-86eb-e16af1156f4a' } },
            hasMatchdays: true,
            homeAndAway: false,
            tournament: {
              connect: {
                id: generateFixturesDto.tournamentId,
              },
            },
          },
        })
      ).id;
    //

    // Transformando a criação dos jogos em um mapeamento para evitar uso de forEach com async
    const matchPromises = fixtures.flatMap((fixture) =>
      fixture.matches.map((match) => {
        return this.prismaService.match.create({
          data: {
            dateTime: new Date(
              startDate.getTime() + fixture.round * roundDuration,
            ),
            venue: { connect: { id: match.homeTeam.venue.id } },
            location: match.homeTeam.location,
            referee: {
              connect: { id: '98607c34-e199-4927-ad41-df16aff496c9' },
            },
            teamType: { connect: { id: match.homeTeam.teamType.id } },
            attendance: 1000,
            homeTeam: {
              connect: { id: match.homeTeam.id },
            },
            awayTeam: {
              connect: { id: match.awayTeam.id },
            },
            status: { connect: { id: 'fbf32190-4170-479d-b97c-ddb99e123c1a' } },
            numberPeriods: 2,
            durationPerPeriod: 45,
            halfTimeDuration: 15,
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
        });
      }),
    );

    // Executando todas as promessas de criação dos jogos simultaneamente
    await Promise.all(matchPromises);
  }
}
