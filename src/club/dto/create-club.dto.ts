import { IsDateString, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateClubDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsDateString()
  foundingDate: Date;

  @IsOptional()
  @IsUrl()
  website?: string;
}
