import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsInt,
  IsBoolean,
  IsOptional,
  IsDate,
} from 'class-validator';

export class StageDto {
  @ApiProperty({
    description: 'ID da fase',
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
  })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Nome da fase', example: 'Fase de Grupos' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Ordem da fase', example: 1 })
  @IsInt()
  order: number;

  @ApiProperty({
    description: 'ID do tipo de fase',
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  typeId?: string;

  @ApiProperty({
    description: 'Indica se a fase tem dias de jogos',
    example: true,
  })
  @IsBoolean()
  hasMatchdays: boolean;

  @ApiProperty({
    description: 'Indica se os jogos são realizados em casa e fora',
    example: true,
  })
  @IsBoolean()
  homeAndAway: boolean;

  @ApiProperty({
    description: 'ID do torneio relacionado',
    example: 't1u2v3w4-x5y6-z7a8-b9c0-d1e2f3g4h5i6',
  })
  @IsUUID()
  tournamentId: string;

  @ApiProperty({
    description: 'Data de criação da fase',
    example: '2023-01-15T12:00:00Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Data de última atualização da fase',
    example: '2024-10-11T10:30:00Z',
  })
  @IsDate()
  updatedAt: Date;
}
