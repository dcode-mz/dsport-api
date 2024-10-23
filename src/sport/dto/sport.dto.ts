import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsArray, IsDate } from 'class-validator';

export class SportDto {
  @ApiProperty({
    description: 'Identificador único do desporto',
    example: 'b1a7c9c4-5f68-4d3b-9f74-6c3a5a73459d',
  })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Nome do desporto', example: 'Futebol' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'URL ou caminho do ícone do desporto',
    example: 'football_icon.svg',
  })
  @IsString()
  icon: string;

  @ApiPropertyOptional({
    description: 'Descrição do desporto',
    example: 'Um desporto popular jogado por equipes de 11 jogadores.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Lista de torneios associados ao desporto',
    type: [String],
    example: ['idTorneio1', 'idTorneio2'],
  })
  @IsArray()
  tournaments: string[];

  @ApiProperty({
    description: 'Lista de equipes associadas ao desporto',
    type: [String],
    example: ['idEquipe1', 'idEquipe2'],
  })
  @IsArray()
  teams: string[];

  @ApiProperty({
    description: 'Lista de utilizadores associados ao desporto',
    type: [String],
    example: ['idUtilizador1', 'idUtilizador2'],
  })
  @IsArray()
  users: string[];

  @ApiProperty({
    description: 'Data de criação do desporto',
    example: '2023-08-21T10:20:30Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do desporto',
    example: '2023-08-22T15:45:30Z',
  })
  @IsDate()
  updatedAt: Date;
}
