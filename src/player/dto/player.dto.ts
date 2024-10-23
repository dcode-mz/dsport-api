import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsUUID,
  IsOptional,
  IsInt,
  IsDecimal,
  IsDate,
} from 'class-validator';

export class PlayerDto {
  @ApiProperty({
    description: 'ID do jogador',
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
  })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Nome do jogador', example: 'Jogador A' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Apelido do jogador',
    example: 'Apoelido',
    required: false,
  })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiProperty({
    description: 'ID da posição do jogador',
    example: 'p1q2r3s4-t5u6-v7w8-x9y0-z1a2b3c4d5e6',
  })
  @IsUUID()
  positionId: string;

  @ApiProperty({
    description: 'Data de nascimento do jogador',
    example: '1990-01-01',
  })
  @IsDate()
  @Type(() => Date)
  dateOfBirth: string;

  @ApiProperty({
    description: 'ID da nacionalidade primária',
    example: 'c1d2e3f4-g5h6-i7j8-k9l0-m1n2o3p4q5r6',
  })
  @IsUUID()
  primaryNationalityId: string;

  @ApiProperty({
    description: 'Número da camisa no clube',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  jersey_number_club?: number;

  @ApiProperty({
    description: 'Número da camisa na seleção',
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsInt()
  jersey_number_national?: number;

  @ApiProperty({ description: 'Altura do jogador em metros', example: 1.75 })
  @IsDecimal()
  height: number;

  @ApiProperty({ description: 'Peso do jogador em quilos', example: 70 })
  @IsDecimal()
  weight: number;

  @ApiProperty({
    description: 'URL da foto do jogador',
    example: 'http://example.com/photo.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @ApiProperty({
    description: 'ID do time do jogador',
    example: 't1u2v3w4-x5y6-z7a8-b9c0-d1e2f3g4h5i6',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  teamId?: string;

  @ApiProperty({
    description: 'Data de criação do jogador',
    example: '2023-01-15T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de última atualização do jogador',
    example: '2024-10-11T10:30:00Z',
  })
  updatedAt: Date;
}
