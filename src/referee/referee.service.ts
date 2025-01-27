import { Injectable } from '@nestjs/common';
import { CreateRefereeDto } from './dto/create-referee.dto';
import { UpdateRefereeDto } from './dto/update-referee.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RefereeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRefereeDto: CreateRefereeDto) {
    const { name, dateOfBirth, nationalityId, photoUrl } = createRefereeDto;
    const referee = await this.prismaService.referee.create({
      data: {
        name,
        dateOfBirth,
        nationality: { connect: { id: nationalityId } },
        photoUrl,
      },
    });
    return referee;
  }

  findAll() {
    return `This action returns all referee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} referee`;
  }

  update(id: number, updateRefereeDto: UpdateRefereeDto) {
    return `This action updates a #${id} referee`;
  }

  remove(id: number) {
    return `This action removes a #${id} referee`;
  }
}
