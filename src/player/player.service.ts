import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlayerService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPlayerDto: CreatePlayerDto) {
    const {
      name,
      nickname,
      positionId,
      dateOfBirth,
      primaryNationalityId,
      jersey_number_club,
      jersey_number_national,
      height,
      weight,
      photoUrl,
      teamId,
    } = createPlayerDto;

    const player = await this.prismaService.player.create({
      data: {
        name,
        nickname,
        position: { connect: { id: positionId } },
        dateOfBirth: dateOfBirth,
        primaryNationality: { connect: { id: primaryNationalityId } },
        jersey_number_club,
        jersey_number_national,
        height,
        weight,
        photoUrl,
        team: { connect: { id: teamId } },
      },
    });
    return player;
  }

  async createPlayers(playersData: CreatePlayerDto[]) {
    const players = await this.prismaService.player.createMany({
      data: playersData,
    });
    return players;
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
      nickname,
      positionId,
      dateOfBirth,
      primaryNationalityId,
      jersey_number_club,
      jersey_number_national,
      height,
      weight,
      photoUrl,
      teamId,
    } = updatePlayerDto;

    const player = await this.prismaService.player.update({
      where: { id },
      data: {
        name,
        nickname,
        position: { connect: { id: positionId } },
        dateOfBirth: dateOfBirth,
        primaryNationality: { connect: { id: primaryNationalityId } },
        jersey_number_club,
        jersey_number_national,
        height,
        weight,
        photoUrl,
        team: { connect: { id: teamId } },
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
