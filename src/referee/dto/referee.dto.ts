import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsUUID, IsDate, IsOptional } from 'class-validator';

export class RefereeDto {
  @ApiProperty({
    description: 'Identificador único do árbitro',
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
  })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Nome do árbitro', example: 'Pierluigi Collina' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Data de nascimento do árbitro',
    example: '1960-02-13',
    required: false,
  })
  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @ApiProperty({ description: 'Nacionalidade do árbitro', example: 'Italiana' })
  @IsString()
  nationality: string;

  @ApiProperty({
    description: 'URL da foto do árbitro',
    example: 'https://example.com/photo.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @ApiProperty({
    description: 'Data de criação do árbitro',
    example: '2023-01-15T12:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do árbitro',
    example: '2024-10-11T10:30:00Z',
  })
  @IsDate()
  updatedAt: Date;
}
