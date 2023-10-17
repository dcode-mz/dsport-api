import { IsInt, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSeasonDto {
  @ApiProperty({
    description: 'Year of the season',
    example: 2023,
  })
  @IsInt()
  year: number;

  @ApiProperty({
    description: 'Start date of the season',
    example: '2023-01-01',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'End date of the season',
    example: '2023-12-31',
  })
  @IsDateString()
  endDate: string;
}
