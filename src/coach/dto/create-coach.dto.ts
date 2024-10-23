import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsUUID, IsDate, IsOptional } from 'class-validator';

export class CreateCoachDto {
  @ApiProperty({ description: 'Nome do treinador', example: 'José Mourinho' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Data de nascimento do treinador',
    example: '1924-10-11T00:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
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
}
