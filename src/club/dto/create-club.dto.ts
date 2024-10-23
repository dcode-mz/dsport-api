import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsUUID, IsOptional, IsDate } from 'class-validator';

export class CreateClubDto {
  @ApiProperty({
    description: 'Nome do clube',
    example: 'Clube Ferroviário de Maputo',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Nome abreviado do clube',
    example: 'CFM',
  })
  @IsOptional()
  @IsString()
  shortName?: string;

  @ApiPropertyOptional({
    description: 'Descrição do clube',
    example: 'Clube de futebol com tradição em Moçambique.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Logo do clube (URL ou caminho)',
    example: 'CBB.png',
  })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({
    description: 'Data de fundação do clube',
    example: '1924-10-11T00:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  foundingDate: Date;

  @ApiPropertyOptional({
    description: 'Website oficial do clube',
    example: 'https://www.clubeferroviario.co.mz',
  })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional({
    description: 'Lista de torneios associados ao clube',
    type: [String],
    example: ['idTorneio1', 'idTorneio2'],
  })
  @IsOptional()
  @IsUUID(undefined, { each: true })
  tournaments?: string[];

  @ApiPropertyOptional({
    description: 'Lista de times associados ao clube',
    type: [String],
    example: ['idTime1', 'idTime2'],
  })
  @IsOptional()
  @IsUUID(undefined, { each: true })
  teams?: string[];

  @ApiPropertyOptional({
    description: 'Lista de jogadores do clube',
    type: [String],
    example: ['idJogador1', 'idJogador2'],
  })
  @IsOptional()
  @IsUUID(undefined, { each: true })
  players?: string[];

  @ApiPropertyOptional({
    description: 'Lista de notícias relacionadas ao clube',
    type: [String],
    example: ['idNoticia1', 'idNoticia2'],
  })
  @IsOptional()
  @IsUUID(undefined, { each: true })
  news?: string[];

  @ApiPropertyOptional({
    description: 'Lista de utilizadores associados ao clube',
    type: [String],
    example: ['idUtilizador1', 'idUtilizador2'],
  })
  @IsOptional()
  @IsUUID(undefined, { each: true })
  users?: string[];

  @ApiPropertyOptional({
    description: 'Lista de grupos associados ao clube',
    type: [String],
    example: ['idGrupo1', 'idGrupo2'],
  })
  @IsOptional()
  @IsUUID(undefined, { each: true })
  groups?: string[];

  @ApiPropertyOptional({
    description: 'Lista de treinadores do clube',
    type: [String],
    example: ['idTreinador1', 'idTreinador2'],
  })
  @IsOptional()
  @IsUUID(undefined, { each: true })
  coachs?: string[];
}
