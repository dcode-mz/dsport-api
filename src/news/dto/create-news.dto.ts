import { IsString, IsUUID, IsDateString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsDateString()
  publishDate: string;

  @IsString()
  author: string;

  @IsUUID()
  clubId: string;
}
