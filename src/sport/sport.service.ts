import { Injectable } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { format } from 'date-fns';

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

  async findSportsWithTournaments() {
    const sports = await this.prismaService.sport.findMany({
      include: {
        tournaments: true,
      },
    });
    return sports;
  }

  async findSportsWithTournamentsAndClubs() {
    const sports = await this.prismaService.sport.findMany({
      include: {
        tournaments: {
          include: {
            clubs: {
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
    });
    return sports.map((sport) => ({
      id: sport.id,
      name: sport.name,
      icon: sport.icon,
      clubs: sport.tournaments.flatMap((tournament) => tournament.clubs),
    }));
  }

  async getMatchesBySport(idSport: string) {
    const sport = await this.prismaService.sport.findUnique({
      where: { id: idSport },
      include: {
        tournaments: {
          include: {
            stage: {
              include: {
                matchdays: {
                  include: {
                    matches: {
                      include: {
                        homeTeam: true,
                        awayTeam: true,
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
        tournament.stage.flatMap((stage) =>
          stage.matchdays.flatMap((matchday) =>
            matchday.matches.map((match) => ({
              date: format(new Date(match.dateTime), 'dd-MM-yyyy'),
              tournament: tournament.name,
              logo: tournament.logo,
              match: {
                homeTeam: match.homeTeam,
                awayTeam: match.awayTeam,
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
