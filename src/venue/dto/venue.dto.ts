import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsOptional,
  IsInt,
  IsArray,
  IsDate,
} from 'class-validator';

export class VenueDto {
  @ApiProperty({
    description: 'Identificador único do venue',
    example: 'd1734aeb-3d14-4d5e-bf17-2b4bc3ebf67e',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Nome do local (venue)',
    example: 'Estádio da Machava',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Localização do venue',
    example: 'Maputo, Moçambique',
  })
  @IsString()
  location: string;

  @ApiPropertyOptional({ description: 'Capacidade do venue', example: 50000 })
  @IsOptional()
  @IsInt()
  capacity?: number;

  @ApiProperty({
    description: 'Lista de identificadores de partidas no venue',
    type: [String],
    example: ['matchId1', 'matchId2'],
  })
  @IsArray()
  matchs: string[];

  @ApiProperty({
    description: 'Lista de identificadores de times que utilizam o venue',
    type: [String],
    example: ['teamId1', 'teamId2'],
  })
  @IsArray()
  teams: string[];

  @ApiProperty({
    description: 'Data de criação do venue',
    example: '2023-01-15T12:00:00Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do venue',
    example: '2024-10-11T10:30:00Z',
  })
  @IsDate()
  updatedAt: Date;
}
