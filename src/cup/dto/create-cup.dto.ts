import { IsString, IsOptional } from 'class-validator';

export class CreateCupDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsString()
  country: string;

  @IsString()
  organizer: string;

  @IsString()
  sportId: string;

  @IsString()
  seasonId: string;
}
