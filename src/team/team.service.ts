import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTeamDto: CreateTeamDto) {
    try {
      const {
        name,
        genderId,
        teamTypeId,
        venueId,
        contact,
        location,
        clubId,
        sportId,
        ageCategoryId,
        formatId,
        captainId,
        viceCaptainId,
        coachId,
      } = createTeamDto;

      const team = await this.prismaService.team.create({
        data: {
          name,
          gender: { connect: { id: genderId } },
          teamType: { connect: { id: teamTypeId } },
          venue: { connect: { id: venueId } },
          contact,
          location,
          club: { connect: { id: clubId } },
          sport: { connect: { id: sportId } },
          ageCategory: { connect: { id: ageCategoryId } },
          format: { connect: { id: formatId } },
          captain: { connect: { id: captainId } },
          viceCaptain: { connect: { id: viceCaptainId } },
          coach: { connect: { id: coachId } },
        },
      });

      return team;
    } catch (error) {
      throw new Error('Erro ao criar o equipa: ' + error.message);
    }
  }

  findAll() {
    return `This action returns all team`;
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
