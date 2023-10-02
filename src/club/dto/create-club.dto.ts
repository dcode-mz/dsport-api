import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateClubDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsString()
  foundingDate: Date;

  @IsOptional()
  @IsUrl()
  website?: string;
}
