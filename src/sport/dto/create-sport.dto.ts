import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSportDto {
  @IsString()
  @Length(3, 10)
  @IsNotEmpty()
  name: string;

  description: string;
}
