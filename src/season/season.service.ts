import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeasonService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSeasonDto: CreateSeasonDto) {
    const { name, startDate, endDate } = createSeasonDto;
    if (isNaN(startDate.getTime()) && isNaN(endDate.getTime())) {
      throw new HttpException(
        'A data deve estar no formato AAAA-MM-DD',
        HttpStatus.BAD_REQUEST,
      );
    }

    const season = await this.prismaService.season.create({
      data: {
        name,
        startDate,
        endDate,
      },
    });
    return season;
  }

  async findAll() {
    const users = await this.prismaService.season.findMany();
    return users;
  }

  async findOne(id: string) {
    const user = await this.prismaService.season.findUnique({ where: { id } });
    return user;
  }

  async update(id: string, updateSeasonDto: UpdateSeasonDto) {
    const { name, startDate, endDate } = updateSeasonDto;
    const user = await this.prismaService.season.update({
      where: { id },
      data: {
        name,
        startDate,
        endDate,
      },
    });
    return user;
  }

  async remove(id: string) {
    const season = await this.prismaService.season.delete({
      where: { id },
    });
    return season;
  }
}
