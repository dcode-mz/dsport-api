import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateLeagueDto {
  @ApiProperty({
    description: 'Name of the league',
    example: 'Moçambola',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the league',
    example: 'A popular league sport played with a round ball.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Icon of the league',
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
