import { Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClubService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createClubDto: CreateClubDto) {
    try {
      const { name, description, foundingDate: date } = createClubDto;
      const foundingDate = new Date(date);

      const createdClub = await this.prismaService.club.create({
        data: {
          name,
          description,
          foundingDate,
        },
      });

      return createdClub;
    } catch (error) {
      throw new Error('Erro ao criar o clube: ' + error.message);
    }
  }

  findAll() {
    return `This action returns all club`;
  }

  findOne(id: number) {
    return `This action returns a #${id} club`;
  }

  update(id: number, updateClubDto: UpdateClubDto) {
    return `This action updates a #${id} club`;
  }

  remove(id: number) {
    return `This action removes a #${id} club`;
  }
}
