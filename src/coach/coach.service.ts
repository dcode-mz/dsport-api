import { Injectable } from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoachService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCoachDto: CreateCoachDto) {
    const { name, dateOfBirth, nationality, photoUrl, clubId, teamId } =
      createCoachDto;
    const coach = await this.prismaService.coach.create({
      data: { name, dateOfBirth, nationality, photoUrl, clubId, teamId },
    });
    return coach;
  }

  findAll() {
    return `This action returns all coach`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coach`;
  }

  update(id: number, updateCoachDto: UpdateCoachDto) {
    return `This action updates a #${id} coach`;
  }

  remove(id: number) {
    return `This action removes a #${id} coach`;
  }
}
