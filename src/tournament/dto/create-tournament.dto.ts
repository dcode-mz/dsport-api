import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsArray } from 'class-validator';

export class CreateTournamentDto {
  @ApiProperty({ description: 'Nome do torneio', example: 'Taça Moçambique' })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Descrição do torneio',
    example: 'Torneio nacional de futebol em Moçambique.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Logo do torneio (URL ou caminho)',
    example: '/logos/taca_mocambique.png',
  })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({
    description: 'Identificador do país do torneio',
    example: 'idPais1',
  })
  @IsUUID()
  countryId: string;

  @ApiProperty({
    description: 'Organizador do torneio',
    example: 'Federação Moçambicana de Futebol',
  })
  @IsString()
  organizer: string;

  @ApiProperty({
    description: 'Identificador do gênero do torneio',
    example: 'idGenero1',
  })
  @IsUUID()
  genderId: string;

  @ApiProperty({
    description: 'Identificador do tipo de torneio',
    example: 'idTipo1',
  })
  @IsUUID()
  typeId: string;

  @ApiProperty({
    description: 'Identificador do nível do torneio',
    example: 'idNivel1',
  })
  @IsUUID()
  levelId: string;

  @ApiProperty({
    description: 'Identificador do formato do torneio',
    example: 'idFormato1',
  })
  @IsUUID()
  formatId: string;

  @ApiProperty({
    description: 'Identificador da categoria de idade do torneio',
    example: 'idCategoria1',
  })
  @IsUUID()
  categoryId: string;

  @ApiPropertyOptional({
    description: 'Identificador dos critérios de desempate',
    example: 'idDesempate1',
  })
  @IsOptional()
  @IsUUID()
  tiebreakerCriteriaId?: string;

  @ApiProperty({
    description: 'Identificador do desporto',
    example: 'idDesporto1',
  })
  @IsUUID()
  sportId: string;

  @ApiProperty({
    description: 'Identificador da temporada',
    example: 'idTemporada1',
  })
  @IsUUID()
  seasonId: string;

  @ApiProperty({
    description: 'Lista de fases do torneio',
    type: [String],
    example: ['idFase1', 'idFase2'],
  })
  @IsArray()
  stage: string[];

  @ApiProperty({
    description: 'Lista de clubes participantes',
    type: [String],
    example: ['idClube1', 'idClube2'],
  })
  @IsArray()
  clubs: string[];

  @ApiProperty({
    description: 'Lista de utilizadores associados ao torneio',
    type: [String],
    example: ['idUtilizador1', 'idUtilizador2'],
  })
  @IsArray()
  users: string[];
}
