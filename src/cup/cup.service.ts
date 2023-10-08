import { Injectable } from '@nestjs/common';
import { CreateCupDto } from './dto/create-cup.dto';
import { UpdateCupDto } from './dto/update-cup.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CupService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCupDto: CreateCupDto) {
    const { name, description, country, logo, organizer, seasonId, sportId } =
      createCupDto;

    const league = await this.prismaService.cup.create({
      data: { name, description, country, logo, organizer, seasonId, sportId },
    });
    return league;
  }

  async findAll() {
    const cup = await this.prismaService.cup.findMany();
    return cup;
  }

  async findOne(id: string) {
    const cup = await this.prismaService.cup.findUnique({
      where: { id },
    });
    return cup;
  }

  async update(id: string, updateCupDto: UpdateCupDto) {
    const { name, description, country, logo, organizer, seasonId, sportId } =
      updateCupDto;
    const cup = await this.prismaService.cup.update({
      where: { id },
      data: { name, description, country, logo, organizer, seasonId, sportId },
    });
    return cup;
  }

  async remove(id: string) {
    const cup = await this.prismaService.league.delete({
      where: { id },
    });
    return cup;
  }
}
