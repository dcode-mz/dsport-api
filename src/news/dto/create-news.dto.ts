import { IsString, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({
    description: 'Title of the news',
    example: 'Exciting Match Results', // Example value for the title
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Content of the news',
    example: 'Incredible goals scored in the recent match...', // Example value for the content
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Publish date of the news',
    example: '2023-10-15', // Example value for the publishDate
  })
  @IsDateString()
  publishDate: string;

  @ApiProperty({
    description: 'Author of the news',
    example: 'John Doe', // Example value for the author
  })
  @IsString()
  author: string;

  @ApiProperty({
    description: 'UUID of the associated club',
    example: '123e4567-e89b-12d3-a456-426655440000', // Example value for clubId
  })
  @IsUUID()
  clubId: string;
}
