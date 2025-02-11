import {
  IsUUID,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

class BaseDto {
  @IsUUID()
  id: string;
}

class VenueDto extends BaseDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsNumber()
  capacity: number;
}

class NationalityDto extends BaseDto {
  @IsString()
  name: string;

  @IsString()
  logo: string;
}

class RefereeDto extends BaseDto {
  @IsString()
  name: string;

  @IsString()
  photoUrl: string;

  @ValidateNested()
  @Type(() => NationalityDto)
  nationality: NationalityDto;
}

class TeamTypeDto extends BaseDto {
  @IsString()
  name: string;
}

class ClubDto extends BaseDto {
  @IsString()
  name: string;

  @IsString()
  logo: string;

  @IsString()
  shortName: string;
}

class GenderDto extends BaseDto {
  @IsString()
  name: string;
}

class PlayerDto extends BaseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsNumber()
  jersey_number_club: number;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}

class TeamDto extends BaseDto {
  @ValidateNested()
  @Type(() => ClubDto)
  club: ClubDto;

  @ValidateNested()
  @Type(() => GenderDto)
  gender: GenderDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlayerDto)
  players: PlayerDto[];
}

export class MatchDetailsDto extends BaseDto {
  @IsDate()
  dateTime: Date;

  @ValidateNested()
  @Type(() => VenueDto)
  venue: VenueDto;

  @ValidateNested()
  @Type(() => RefereeDto)
  referee: RefereeDto;

  @IsNumber()
  attendance: number;

  @ValidateNested()
  @Type(() => TeamTypeDto)
  teamType: TeamTypeDto;

  @ValidateNested()
  @Type(() => TeamDto)
  homeTeam: TeamDto;

  @ValidateNested()
  @Type(() => TeamDto)
  awayTeam: TeamDto;
}
