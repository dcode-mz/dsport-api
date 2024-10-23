import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsUUID, IsDate, IsOptional } from 'class-validator';

export class CoachDto {
  @ApiProperty({
    description: 'Identificador único do treinador',
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
  })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Nome do treinador', example: 'José Mourinho' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Data de nascimento do treinador',
    example: '1924-10-11T00:00:00Z',
  })
  @IsDate()
  dateOfBirth: Date;

  @ApiProperty({
    description: 'Nacionalidade do treinador',
    example: 'Português',
  })
  @IsString()
  nationality: string;

  @ApiProperty({
    description: 'URL da foto do treinador',
    example: 'https://example.com/photo.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @ApiProperty({
    description: 'ID da equipa do treinador',
    example: 'teamId123',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  teamId?: string;

  @ApiProperty({
    description: 'ID do clube do treinador',
    example: 'clubId123',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  clubId?: string;

  @ApiProperty({
    description: 'Data de criação do treinador',
    example: '2023-01-15T12:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do treinador',
    example: '2024-10-11T10:30:00Z',
  })
  @IsDate()
  updatedAt: Date;
}
