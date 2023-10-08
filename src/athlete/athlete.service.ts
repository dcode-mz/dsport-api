import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AthleteService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAthleteDto: CreateAthleteDto) {
    const {
      name,
      position,
      dateOfBirth,
      nationality,
      height,
      weight,
      photoUrl,
      clubId,
    } = createAthleteDto;
    const dateOfBirthValidated = new Date(dateOfBirth);
    if (isNaN(dateOfBirthValidated.getTime())) {
      throw new HttpException(
        'A data deve estar no formato AAAA-MM-DD',
        HttpStatus.BAD_REQUEST,
      );
    }

    const athlete = await this.prismaService.athlete.create({
      data: {
        name,
        position,
        dateOfBirth: dateOfBirthValidated,
        nationality,
        height,
        weight,
        photoUrl,
        clubId,
      },
    });
    return athlete;
  }

  async findAll() {
    const athlete = await this.prismaService.athlete.findMany();
    return athlete;
  }

  async findOne(id: string) {
    const athlete = await this.prismaService.athlete.findUnique({
      where: { id },
    });
    return athlete;
  }

  async update(id: string, updateAthleteDto: UpdateAthleteDto) {
    const {
      name,
      position,
      dateOfBirth,
      nationality,
      height,
      weight,
      photoUrl,
      clubId,
    } = updateAthleteDto;

    const athlete = await this.prismaService.athlete.update({
      where: { id },
      data: {
        name,
        position,
        dateOfBirth,
        nationality,
        height,
        weight,
        photoUrl,
        clubId,
      },
    });
    return athlete;
  }

  async remove(id: string) {
    const athlete = await this.prismaService.athlete.delete({
      where: { id },
    });
    return athlete;
  }
}
