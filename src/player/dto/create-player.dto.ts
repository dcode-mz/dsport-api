import {
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  name: string;

  @IsString()
  position: string;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  nationality: string;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsOptional()
  @IsUrl()
  photoUrl?: string;

  @IsOptional()
  @IsUUID()
  clubId?: string;
}
