import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LeagueService } from 'src/league/league.service';
import { SportService } from 'src/sport/sport.service';

@Injectable()
export class ClubService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly leagueService: LeagueService,
    private readonly sportService: SportService,
  ) {}

  async create(createClubDto: CreateClubDto) {
    try {
      const {
        name,
        shortName,
        description,
        foundingDate: date,
        logo,
        website,
        leagues,
        sports,
      } = createClubDto;
      const foundingDate = new Date(date);

      if (isNaN(foundingDate.getTime())) {
        throw new HttpException(
          'A data deve estar no formato AAAA-MM-DD',
          HttpStatus.BAD_REQUEST,
        );
      }

      const club = await this.prismaService.club.create({
        data: {
          name,
          shortName,
          description,
          foundingDate,
          logo,
          website,
          sports: {
            connect: sports.map((id) => ({ id })),
          },
          leagues: {
            connect: leagues.map((id) => ({ id })),
          },
        },
      });

      return club;
    } catch (error) {
      throw new Error('Erro ao criar o clube: ' + error.message);
    }
  }

  async findAll() {
    const club = await this.prismaService.club.findMany();
    return club;
  }

  async findOne(id: string) {
    const club = await this.prismaService.club.findUnique({ where: { id } });
    return club;
  }

  async update(id: string, updateClubDto: UpdateClubDto) {
    const {
      name,
      description,
      foundingDate: date,
      logo,
      website,
    } = updateClubDto;
    const club = await this.prismaService.club.update({
      where: { id },
      data: {
        name,
        description,
        foundingDate: date,
        logo,
        website,
      },
    });
    return club;
  }

  async remove(id: string) {
    const club = await this.prismaService.club.delete({
      where: { id },
    });
    return club;
  }
}
