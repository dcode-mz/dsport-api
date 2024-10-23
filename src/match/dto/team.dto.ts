import { AgeCategoryDto } from './age-category.dto';
import { ClubDto } from './club.dto';
import { CoachDto } from './coach.dto';
import { FormatDto } from './format.dto';
import { GenderDto } from './gender.dto';
import { SportDto } from './sport.dto';
import { TeamTypeDto } from './team-type.dto';
import { VenueDto } from './venue.dto';

export class TeamDto {
  id: string;
  name: string;
  gender: GenderDto;
  teamType: TeamTypeDto;
  venue: VenueDto;
  contact?: string;
  location?: string;
  club: ClubDto;
  sport: SportDto;
  ageCategory: AgeCategoryDto;
  format?: FormatDto;
  coach?: CoachDto;
  createdAt: Date;
  updatedAt: Date;
}
