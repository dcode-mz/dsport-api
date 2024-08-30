import { Injectable } from '@nestjs/common';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StageService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createStageDto: CreateStageDto) {
    return this.prismaService.stage.create({
      data: {
        name: createStageDto.name,
        order: createStageDto.order,
        type: createStageDto.type,
        hasMatchdays: createStageDto.hasMatchdays,
        homeAndAway: createStageDto.homeAndAway,
        tournament: {
          connect: { id: createStageDto.tournamentId }, // ID do torneio ao qual este Stage pertence
        },
      },
    });
  }

  findAll() {
    return `This action returns all stage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stage`;
  }

  update(id: number, updateStageDto: UpdateStageDto) {
    return `This action updates a #${id} stage`;
  }

  remove(id: number) {
    return `This action removes a #${id} stage`;
  }
}
