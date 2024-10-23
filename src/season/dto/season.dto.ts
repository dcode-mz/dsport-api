import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDate, IsString, IsArray } from 'class-validator';

export class SeasonDto {
  @ApiProperty({
    description: 'Identificador único da temporada',
    example: 'a7c9b1c4-5f68-4d3b-9f74-6c3a5a73459d',
  })
  @IsUUID()
  id: string;

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
  startDate: Date;

  @ApiProperty({
    description: 'Data de término da temporada',
    example: '2024-06-30T23:59:59Z',
  })
  @IsDate()
  endDate: Date;

  @ApiProperty({
    description: 'Lista de torneios associados à temporada',
    type: [String],
    example: ['idTorneio1', 'idTorneio2'],
  })
  @IsArray()
  tournaments: string[];

  @ApiProperty({
    description: 'Data de criação da temporada',
    example: '2023-08-21T10:20:30Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização da temporada',
    example: '2023-08-22T15:45:30Z',
  })
  @IsDate()
  updatedAt: Date;
}
