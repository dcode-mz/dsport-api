import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsDate,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { TeamDto } from './team.dto';

export class CreateMatchDto {
  @ApiProperty({
    description: 'Data e hora do jogo',
    example: '2024-10-11T15:30:00Z',
  })
  @IsDate()
  dateTime: Date;

  @ApiProperty({
    description: 'ID do local onde o jogo ocorrerá',
    example: 'venueId123',
  })
  @IsUUID()
  venueId: string;

  @ApiProperty({
    description: 'Localização do jogo',
    example: 'Estádio Nacional',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'ID do árbitro do jogo',
    example: 'refereeId123',
  })
  @IsUUID()
  refereeId: string;

  @ApiProperty({
    description: 'ID do tipo de time (Home/Away)',
    example: 'teamTypeId123',
  })
  @IsUUID()
  teamTypeid: string;

  @ApiProperty({ description: 'ID do time da casa', example: 'homeTeamId123' })
  @IsUUID()
  homeTeamId: TeamDto;

  @ApiProperty({
    description: 'ID do time visitante',
    example: 'awayTeamId123',
  })
  @IsUUID()
  awayTeamId: TeamDto;

  @ApiProperty({ description: 'ID do status do jogo', example: 'statusId123' })
  @IsUUID()
  statusId: string;

  @ApiProperty({ description: 'ID do dia do jogo', example: 'matchdayId123' })
  @IsUUID()
  matchdayId: string;

  @ApiProperty({ description: 'Número de períodos do jogo', example: 2 })
  @IsNumber()
  numberPeriods: number;

  @ApiProperty({
    description: 'Duração de cada período em minutos',
    example: 45,
  })
  @IsNumber()
  durationPerPeriod: number;

  @ApiProperty({
    description: 'Duração do intervalo em minutos',
    example: 15,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  halfTimeDuration?: number;
}
