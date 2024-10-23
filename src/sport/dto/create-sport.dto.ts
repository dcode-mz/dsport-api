import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateSportDto {
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
}
