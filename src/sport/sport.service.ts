import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { format } from 'date-fns';
import { ResponseBody } from 'src/common/dto/ResponseBody';

@Injectable()
export class SportService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSportDto: CreateSportDto) {
    const { name, description, icon } = createSportDto;
    const user = await this.prismaService.sport.create({
      data: {
        name,
        description,
        icon,
      },
    });
    return user;
  }

  async findAll() {
    const users = await this.prismaService.sport.findMany();
    return users;
  }

  async findOne(id: string) {
    const user = await this.prismaService.sport.findUnique({ where: { id } });
    return user;
  }

  async update(id: string, updateSportDto: UpdateSportDto) {
    const { name, description, icon } = updateSportDto;
    const user = await this.prismaService.sport.update({
      where: { id },
      data: {
        name,
        description,
        icon,
      },
    });
    return user;
  }

  async remove(id: string) {
    const user = await this.prismaService.sport.delete({
      where: { id },
    });
    return user;
  }

  async findSportsWithTournaments(): Promise<
    ResponseBody<SportsTournamentsResponse[]>
  > {
    try {
      const sports = await this.prismaService.sport.findMany({
        select: {
          id: true,
          name: true,
          icon: true,
          tournaments: {
            select: {
              id: true,
              name: true,
              description: true,
              logo: true,
              organizer: true,
            },
          },
        },
      });
      return new ResponseBody<SportsTournamentsResponse[]>(
        'Consulta de desportos feita com sucesso',
        sports,
        true,
      );
    } catch (error) {
      throw new InternalServerErrorException(`Algo deu errado: ${error}`);
    }
  }

  async findSportsWithTournamentsAndClubs() {
    const sports = await this.prismaService.sport.findMany({
      include: {
        tournaments: {
          include: {
            teams: {
              select: {
                club: {
                  select: {
                    id: true,
                    name: true,
                    shortName: true,
                    logo: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const sportsMap = sports.map((sport) => ({
      id: sport.id,
      name: sport.name,
      icon: sport.icon,
      clubs: sport.tournaments.flatMap((tournament) =>
        tournament.teams.flatMap((team) => team.club),
      ),
    }));

    return new ResponseBody<SportsClubsResponse[]>(
      'Consulta de desportos feita com sucesso',
      sportsMap,
      true,
    );
  }

  async getMatchesBySportAndDate(idSport: string, date: string) {
    if (!idSport || !date) {
      return { message: 'O ID do esporte e a data são obrigatórios.' };
    }

    let targetDate: Date;
    try {
      targetDate = new Date(date);
      if (isNaN(targetDate.getTime())) {
        return { message: 'A data fornecida é inválida.' };
      }
    } catch (error) {
      return { message: 'Erro ao converter a data fornecida.' };
    }

    let sport;
    try {
      sport = await this.prismaService.sport.findUnique({
        where: { id: idSport },
        select: {
          id: true,
          name: true,
          description: true,
          tournaments: {
            select: {
              id: true,
              name: true,
              logo: true,
              stages: {
                select: {
                  matchdays: {
                    select: {
                      matches: {
                        select: {
                          id: true,
                          dateTime: true,
                          homeTeam: {
                            select: {
                              id: true,
                              club: {
                                select: { id: true, name: true, logo: true },
                              },
                            },
                          },
                          awayTeam: {
                            select: {
                              id: true,
                              club: {
                                select: { id: true, name: true, logo: true },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!sport) {
        return new ResponseBody(
          'Desporto não encontrado para o ID fornecido.',
          null,
          true,
        );
      }
    } catch (error) {
      return { message: 'Erro ao buscar os dados do esporte.' };
    }

    let groupedData;
    try {
      groupedData = sport.tournaments.flatMap((tournament) =>
        tournament.stages.flatMap((stage) =>
          stage.matchdays.flatMap((matchday) =>
            matchday.matches
              .filter((match) => {
                const matchDate = new Date(match.dateTime);
                return (
                  matchDate.getFullYear() === targetDate.getFullYear() &&
                  matchDate.getMonth() === targetDate.getMonth() &&
                  matchDate.getDate() === targetDate.getDate()
                );
              })
              .map((match) => ({
                id: tournament.id,
                tournament: tournament.name,
                logo: tournament.logo,
                match: {
                  id: match.id,
                  homeTeam: {
                    id: match.homeTeam.id,
                    name: match.homeTeam.club.name,
                    logo: match.homeTeam.club.logo,
                  },
                  awayTeam: {
                    id: match.awayTeam.id,
                    name: match.awayTeam.club.name,
                    logo: match.awayTeam.club.logo,
                  },
                  time: format(new Date(match.dateTime), 'HH:mm'),
                },
              })),
          ),
        ),
      );

      if (groupedData.length === 0) {
        return new ResponseBody(
          'Nenhuma partida encontrada para a data especificada.',
          null,
          true,
        );
      }
    } catch (error) {
      return { message: 'Erro ao processar os dados das partidas.' };
    }

    try {
      // Agrupando por torneio e retornando como objeto de uma data única
      const tournamentsByDate = groupedData.reduce(
        (acc, curr) => {
          const existingTournament = acc.tournaments.find(
            (t) => t.name === curr.tournament,
          );

          if (existingTournament) {
            existingTournament.matches.push(curr.match);
          } else {
            acc.tournaments.push({
              id: curr.id,
              name: curr.tournament,
              logo: curr.logo,
              matches: [curr.match],
            });
          }

          return acc;
        },
        { date: format(targetDate, 'dd-MM-yyyy'), tournaments: [] },
      );

      return new ResponseBody(
        'Consulta de partidas do dia feita com sucesso',
        tournamentsByDate,
        true,
      );
    } catch (error) {
      return { message: 'Erro ao formatar os dados de retorno.' };
    }
  }

  async getMatchesBySport(idSport: string) {
    const sport = await this.prismaService.sport.findUnique({
      where: { id: idSport },
      include: {
        tournaments: {
          include: {
            stages: {
              include: {
                matchdays: {
                  include: {
                    matches: {
                      include: {
                        homeTeam: {
                          include: {
                            club: true,
                          },
                        },
                        awayTeam: {
                          include: {
                            club: true,
                          },
                        },
                      },
                      orderBy: {
                        dateTime: 'asc',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    // Agrupamento dos jogos por data e torneio
    const groupedData = sport.tournaments
      .flatMap((tournament) =>
        tournament.stages.flatMap((stage) =>
          stage.matchdays.flatMap((matchday) =>
            matchday.matches.map((match) => ({
              date: format(new Date(match.dateTime), 'dd-MM-yyyy'),
              tournament: tournament.name,
              logo: tournament.logo,
              match: {
                homeTeam: match.homeTeam.club.name,
                awayTeam: match.awayTeam.club.name,
                time: format(new Date(match.dateTime), 'HH:mm'),
              },
            })),
          ),
        ),
      )
      .reduce((acc, curr) => {
        const existingDate = acc.find((item) => item.date === curr.date);

        if (existingDate) {
          const existingTournament = existingDate.tournaments.find(
            (t) => t.name === curr.tournament,
          );

          if (existingTournament) {
            existingTournament.matches.push(curr.match);
          } else {
            existingDate.tournaments.push({
              name: curr.tournament,
              logo: curr.logo,
              matches: [curr.match],
            });
          }
        } else {
          acc.push({
            date: curr.date,
            tournaments: [
              {
                name: curr.tournament,
                logo: curr.logo,
                matches: [curr.match],
              },
            ],
          });
        }

        return acc;
      }, []);
    return groupedData;
    // return new ResponseBody(
    //   'Consulta de partidas do dia feita com sucesso',
    //   groupedData,
    //   true,
    // );
  }
}

// async findSportsWithTournaments(sportIds: string[]) {
//   const sports = await this.prismaService.sport.findMany(
//     {
//       where: {
//         id: {
//           in: sportIds,
//         }
//       },
//       include: {
//         tournaments: true,
//       }
//     }
//   );
//   return sports;
// }
