import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
}
