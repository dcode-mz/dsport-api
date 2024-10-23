import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsString, IsArray } from 'class-validator';

export class CreateSeasonDto {
  @ApiProperty({
    description: 'Nome da temporada',
    example: 'Temporada 2023/2024',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Data de início da temporada',
    example: '2023-08-01T00:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    description: 'Data de término da temporada',
    example: '2024-06-30T23:59:59Z',
  })
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @ApiProperty({
    description: 'Lista de torneios associados à temporada',
    type: [String],
    example: ['idTorneio1', 'idTorneio2'],
  })
  @IsArray()
  tournaments: string[];
}
