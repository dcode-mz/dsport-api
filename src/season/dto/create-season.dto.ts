import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString } from 'class-validator';

export class CreateSeasonDto {
  @ApiProperty({
    description: 'Year of the Season',
    example: '2024',
  })
  @IsInt()
  year: number;

  @ApiProperty({
    description: 'Start Date of the Season',
    example: '2024-03-24T00:00:00.000Z',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'End Date of the Season',
    example: '2024-03-24T00:00:00.000Z',
  })
  @IsDateString()
  endDate: string;
}
