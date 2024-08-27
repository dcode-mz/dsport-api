import { IsString, IsDate, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({
    description: 'Date and time of the game',
    example: '2024-08-27T14:30:00.000Z',
  })
  @IsDate()
  dateTime: Date;

  @ApiProperty({
    description: 'Stadium where the game will take place',
    example: 'Estádio da Machava',
  })
  @IsString()
  stadium: string;

  @ApiProperty({
    description: 'Location of the game',
    example: 'Maputo, Moçambique',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Referee of the game',
    example: 'Carlos Alberto',
  })
  @IsString()
  referee: string;

  @ApiProperty({
    description: 'Attendance of the game',
    example: 30000,
  })
  @IsNumber()
  attendance: number;

  @ApiProperty({
    description: 'ID of the home team',
    example: 'b10a8db164e0754105b7a99be72e3fe5',
  })
  @IsString()
  homeTeamId: string;

  @ApiProperty({
    description: 'ID of the away team',
    example: 'e4d909c290d0fb1ca068ffaddf22cbd0',
  })
  @IsString()
  awayTeamId: string;

  @ApiProperty({
    description: 'Result of the home team',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  resultHomeTeam?: number;

  @ApiProperty({
    description: 'Result of the away team',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  resultAwayTeam?: number;

  @ApiProperty({
    description: 'ID of the tournament the game belongs to',
    example: 'fddfdf9c690ca5e87142e50e4b34221a',
    required: false,
  })
  @IsOptional()
  @IsString()
  tournamentId?: string;

  @ApiProperty({
    description: 'ID of the matchday',
    example: 'ad1cb23f54a48b22998b48b8aaf15b8c',
  })
  @IsString()
  matchdayId: string;

  @ApiProperty({
    description: 'ID of the season the game belongs to',
    example: 'f769299bda3782f8f1e850a0bd1fae36',
  })
  @IsString()
  seasonId: string;
}
