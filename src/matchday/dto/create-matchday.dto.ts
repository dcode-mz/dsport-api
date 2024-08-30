import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMatchdayDto {
  @ApiProperty({
    description: 'Number of the matchday within the tournament',
    example: 1,
  })
  @IsNumber()
  number: number;

  @ApiProperty({
    description: 'ID of the tournament associated with the matchday',
    example: 'b10a8db164e0754105b7a99be72e3fe5',
  })
  @IsString()
  tournamentId: string;

  @ApiProperty({
    description: 'ID of the season associated with the matchday',
    example: 'e4d909c290d0fb1ca068ffaddf22cbd0',
  })
  @IsString()
  seasonId: string;
}
