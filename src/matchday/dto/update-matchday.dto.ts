import { PartialType } from '@nestjs/swagger';
import { CreateMatchdayDto } from './create-matchday.dto';

export class UpdateMatchdayDto extends PartialType(CreateMatchdayDto) {}
