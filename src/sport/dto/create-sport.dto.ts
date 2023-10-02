import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateSportDto {
  @IsString()
  name: string;

  @IsString()
  icon: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  leagues?: string[];

  @IsOptional()
  @IsArray()
  cups?: string[];

  @IsOptional()
  @IsArray()
  clubs?: string[];
}
