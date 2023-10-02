import { Injectable } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
    const user = this.prismaService.sport.delete({
      where: { id },
    });
    return user;
  }
}
