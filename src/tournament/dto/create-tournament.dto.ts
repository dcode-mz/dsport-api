import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateTournamentDto {
  @ApiProperty({
    description: 'Name of the tournament',
    example: 'Moçambola',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the tournament',
    example: 'A popular tournament sport played with a round ball.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Icon of the tournament',
    example: 'mocambola.png',
  })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({
    description: 'Id of the Country',
    example: 'ebaf95bc-cba2-493d-8086-73ddbd764334',
  })
  @IsString()
  country: string;

  @ApiProperty({
    description: 'Organizer',
    example: 'FMF',
  })
  @IsString()
  organizer: string;

  @ApiProperty({
    description: 'Id of the sport',
    example: 'ebaf95bc-cba2-493d-8086-73ddbd764334',
  })
  @IsString()
  sportId: string;

  @ApiProperty({
    description: 'Id of the season',
    example: 'ebaf95bc-cba2-493d-8086-73ddbd764334',
  })
  @IsString()
  seasonId: string;
}
