import { Injectable } from '@nestjs/common';
import { CreateMatchdayDto } from './dto/create-matchday.dto';
import { UpdateMatchdayDto } from './dto/update-matchday.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MatchdayService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createMatchdayDto: CreateMatchdayDto) {
    return 'This action adds a new matchday';
  }

  findAll() {
    return `This action returns all matchday`;
  }

  findOne(id: number) {
    return `This action returns a #${id} matchday`;
  }

  update(id: number, updateMatchdayDto: UpdateMatchdayDto) {
    return `This action updates a #${id} matchday`;
  }

  remove(id: number) {
    return `This action removes a #${id} matchday`;
  }

  async findOneByMatchdayNumber(number: number) {
    return await this.prismaService.matchday.findMany({
      where: {
        number,
      },
      include: {
        matches: {
          include: {
            homeTeam: true,
            awayTeam: true,
          },
        },
      },
    });
  }
}
