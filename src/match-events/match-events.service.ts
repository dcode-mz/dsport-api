import { Injectable, Logger } from '@nestjs/common';
import { CreateMatchEventDto } from './dto/create-match-event.dto';
import { UpdateMatchEventDto } from './dto/update-match-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MatchEventsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createMatchEventDto: CreateMatchEventDto) {
    const { typeId, time, details, matchId } = createMatchEventDto;
    Logger.log('Hello Wolds');
    Logger.error('Hello Wolds');
    const matchEvent = await this.prismaService.matchEvent.create({
      data: {
        typeId,
        time,
        details,
        matchId,
      },
    });

    if (
      createMatchEventDto.matchEventPlayer &&
      createMatchEventDto.matchEventPlayer.length > 0
    ) {
      await this.prismaService.matchEventPlayer.createMany({
        data: createMatchEventDto.matchEventPlayer.map((playerEvent) => ({
          eventId: matchEvent.id,
          playerId: playerEvent.playerId,
          role: playerEvent.role,
        })),
      });
    }

    return matchEvent;
  }

  findAll() {
    return `This action returns all matchEvents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} matchEvent`;
  }

  update(id: number, updateMatchEventDto: UpdateMatchEventDto) {
    return `This action updates a #${id} matchEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} matchEvent`;
  }
}
