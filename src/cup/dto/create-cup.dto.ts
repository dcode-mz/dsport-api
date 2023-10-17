import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCupDto {
  @ApiProperty({
    description: 'Name of the cup',
    example: 'FIFA World Cup', // Example value for the name
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the cup',
    example: 'International football tournament', // Example value for the description
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'URL to the cup logo',
    example: 'https://example.com/fifa-world-cup-logo.png', // Example value for the logo
    required: false,
  })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({
    description: 'Country where the cup is held',
    example: 'International', // Example value for the country
  })
  @IsString()
  country: string;

  @ApiProperty({
    description: 'Organizer of the cup',
    example: 'FIFA', // Example value for the organizer
  })
  @IsString()
  organizer: string;

  @ApiProperty({
    description: 'ID of the associated sport',
    example: '123', // Example value for the sportId
  })
  @IsString()
  sportId: string;

  @ApiProperty({
    description: 'ID of the associated season',
    example: '456', // Example value for the seasonId
  })
  @IsString()
  seasonId: string;
}
