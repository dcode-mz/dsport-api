import { Injectable } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SportService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createSportDto: CreateSportDto) {
    return this.prismaService.sport.create({
      data: {
        name: createSportDto.name,
        description: createSportDto.description,
      },
    });
  }

  findAll() {
    return this.prismaService.sport.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} sport`;
  }

  update(id: number, updateSportDto: UpdateSportDto) {
    return `This action updates a #${id} sport`;
  }

  remove(id: number) {
    return `This action removes a #${id} sport`;
  }
}
