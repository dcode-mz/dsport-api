import { IsDateString, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClubDto {
  @ApiProperty({
    description: 'Name of the club',
    example: 'Manchester United', // Example value for the name
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the club',
    example: 'One of the most iconic football clubs', // Example value for the description
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'URL to the club logo',
    example: 'https://example.com/man-united-logo.png', // Example value for the logo
    required: false,
  })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({
    description: 'Founding date of the club',
    example: '1878-12-02', // Example value for the founding date
  })
  @IsDateString()
  foundingDate: Date;

  @ApiProperty({
    description: 'Website URL of the club',
    example: 'https://www.manutd.com', // Example value for the website
    required: false,
  })
  @IsOptional()
  @IsUrl()
  website?: string;
}
