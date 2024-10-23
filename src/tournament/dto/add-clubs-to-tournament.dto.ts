import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsArray } from 'class-validator';

export class AddTeamsToTournamentDto {
  @ApiProperty({
    description: 'Identificador da temporada',
    example: 'idTorneio',
  })
  @IsUUID()
  tournamentId: string;

  @ApiProperty({
    description: 'Lista de Equipas do torneio',
    type: [String],
    example: ['idTeam1', 'idTeam2'],
  })
  @IsArray()
  teams: string[];
}
