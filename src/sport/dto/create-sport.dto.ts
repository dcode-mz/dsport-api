import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSportDto {
  @ApiProperty({
    description: 'Name of the sport',
    example: 'Football',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Icon of the sport',
    example: 'football_icon.svg',
  })
  @IsString()
  icon: string;

  @ApiProperty({
    description: 'Description of the sport',
    example: 'A popular team sport played with a round ball.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Array of tournaments related to the sport',
    example: ['Premier Tournament', 'Moçambola'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  tournaments?: string[];

  @ApiProperty({
    description: 'Array of cups related to the sport',
    example: ['Taça de Moçambique', 'UEFA Champions Tournament'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  cups?: string[];

  @ApiProperty({
    description: 'Array of clubs related to the sport',
    example: ['Black Fulls', 'Real Madrid'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  clubs?: string[];
}
