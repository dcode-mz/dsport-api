import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlayerService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPlayerDto: CreatePlayerDto) {
    const {
      name,
      position,
      dateOfBirth,
      nationality,
      height,
      weight,
      photoUrl,
      clubId,
    } = createPlayerDto;
    const dateOfBirthValidated = new Date(dateOfBirth);
    if (isNaN(dateOfBirthValidated.getTime())) {
      throw new HttpException(
        'A data deve estar no formato AAAA-MM-DD',
        HttpStatus.BAD_REQUEST,
      );
    }

    const player = await this.prismaService.player.create({
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
    return player;
  }

  async findAll() {
    const player = await this.prismaService.player.findMany();
    return player;
  }

  async findOne(id: string) {
    const player = await this.prismaService.player.findUnique({
      where: { id },
    });
    return player;
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto) {
    const {
      name,
      position,
      dateOfBirth,
      nationality,
      height,
      weight,
      photoUrl,
      clubId,
    } = updatePlayerDto;

    const player = await this.prismaService.player.update({
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
    return player;
  }

  async remove(id: string) {
    const player = await this.prismaService.player.delete({
      where: { id },
    });
    return player;
  }
}
