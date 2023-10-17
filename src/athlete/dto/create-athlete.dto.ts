import {
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAthleteDto {
  @ApiProperty({
    description: 'Name of the athlete',
    example: 'Cristiano Ronaldo', // Example value for the name
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Position of the athlete',
    example: 'Forward', // Example value for the position
  })
  @IsString()
  position: string;

  @ApiProperty({
    description: 'Date of birth of the athlete',
    example: '1985-02-05', // Example value for the dateOfBirth
  })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({
    description: 'Nationality of the athlete',
    example: 'Portuguese', // Example value for nationality
  })
  @IsString()
  nationality: string;

  @ApiProperty({
    description: 'Height of the athlete in centimeters',
    example: 187, // Example value for height
  })
  @IsNumber()
  height: number;

  @ApiProperty({
    description: 'Weight of the athlete in kilograms',
    example: 83, // Example value for weight
  })
  @IsNumber()
  weight: number;

  @ApiProperty({
    description: "URL to the athlete's photo",
    example: 'https://example.com/ronaldo-photo.png', // Example value for photoUrl
    required: false,
  })
  @IsOptional()
  @IsUrl()
  photoUrl?: string;

  @ApiProperty({
    description: 'UUID of the associated club (if applicable)',
    example: '123e4567-e89b-12d3-a456-426655440000', // Example value for clubId
    required: false,
  })
  @IsOptional()
  @IsUUID()
  clubId?: string;
}
