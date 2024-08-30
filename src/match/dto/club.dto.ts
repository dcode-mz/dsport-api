import { IsString, IsDate, IsOptional, IsUUID, IsUrl } from 'class-validator';

export class ClubDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  shortName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  stadium?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsDate()
  foundingDate: Date;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
