import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLeagueDto {
  @ApiProperty({
    description: 'Name of the league',
    example: 'Premier League', // Example value for the name
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the league',
    example: 'Top-tier football league in England', // Example value for the description
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "URL to the league's logo",
    example: 'https://example.com/premier-league-logo.png', // Example value for the logo
    required: false,
  })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({
    description: 'Country where the league is located',
    example: 'England', // Example value for the country
  })
  @IsString()
  country: string;

  @ApiProperty({
    description: 'Organizer of the league',
    example: 'Premier League Management', // Example value for the organizer
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
