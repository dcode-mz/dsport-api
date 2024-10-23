import { Injectable } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VenueService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createVenueDto: CreateVenueDto) {
    try {
      const { name, location, capacity } = createVenueDto;

      const venue = await this.prismaService.venue.create({
        data: { name, location, capacity },
      });

      return venue;
    } catch (error) {
      throw new Error('Erro ao criar o local: ' + error.message);
    }
  }

  findAll() {
    return `This action returns all venue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venue`;
  }

  update(id: number, updateVenueDto: UpdateVenueDto) {
    return `This action updates a #${id} venue`;
  }

  remove(id: number) {
    return `This action removes a #${id} venue`;
  }
}
