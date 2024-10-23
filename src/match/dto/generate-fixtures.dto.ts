import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { TeamDto } from './team.dto';

export class GenerateFixturesDto {
  @ApiProperty({
    description: 'Id da temporada',
    example: 'idTemporada',
  })
  @IsString()
  seasonId: string;

  @ApiProperty({
    description: 'Id do Torneio',
    example: 'idTorneio',
  })
  @IsString()
  @IsString()
  tournamentId: string;

  @ApiProperty({
    description: 'Lista de Equipas do torneio',
    type: [String],
    example: ['idTeam1', 'idTeam2'],
  })
  @IsArray()
  teams: string[];
}
