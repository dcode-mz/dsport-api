import { IsInt, IsDateString } from 'class-validator';

export class CreateSeasonDto {
  @IsInt()
  year: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
