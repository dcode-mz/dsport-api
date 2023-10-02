import { IsInt, IsDate, IsUUID } from 'class-validator';

export class CreateSeasonDto {
  @IsInt()
  year: number;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsUUID()
  leagueId: string;

  @IsUUID()
  cupId: string;
}
