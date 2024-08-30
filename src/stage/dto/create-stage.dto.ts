import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateStageDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  order: number;

  @IsNotEmpty()
  @IsString()
  type: string; // Pode ser 'Group' ou 'Knockout'

  @IsBoolean()
  hasMatchdays: boolean;

  @IsBoolean()
  homeAndAway: boolean;

  @IsNotEmpty()
  @IsUUID()
  tournamentId: string;
}
