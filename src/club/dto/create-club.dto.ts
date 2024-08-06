import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateClubDto {
  @ApiProperty({
    description: 'Name of the club',
    example: 'Black Bulls',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Short Name of the club',
    example: 'CBB',
  })
  @IsString()
  shortName: string;

  @ApiProperty({
    description: 'Description of the club',
    example: 'A popular club sport played with a round ball.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Icon of the club',
    example: 'CBB.png',
  })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({
    description: 'Date Foundation',
    example: 'AAAA-MM-DD',
  })
  @IsDateString()
  foundingDate: Date;

  @ApiProperty({
    description: 'Website of the cub',
    example: 'https://associacaoblackbulls.com/',
    required: false
  })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({
    description: 'Array of sports related to the club',
    example: ['Futebol', 'Basquetebol'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  sports?: string[];

  @ApiProperty({
    description: 'Array of leagues related to the club',
    example: ['Moçambola', 'Supertaça Mario Esteves Coluna'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  leagues?: string[];
}
