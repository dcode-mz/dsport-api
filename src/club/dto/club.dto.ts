import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsUUID, IsOptional, IsArray, IsDate } from 'class-validator';

export class ClubDto {
  @ApiProperty({
    description: 'Identificador único do clube',
    example: 'd9c9b4f5-6f68-43d4-8f74-8f5b7c734e5d',
  })
  @IsUUID()
  id: string;

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
    example: '/logos/ferroviario_maputo.png',
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

  @ApiProperty({
    description: 'Lista de torneios associados ao clube',
    type: [String],
    example: ['idTorneio1', 'idTorneio2'],
  })
  @IsArray()
  tournaments: string[];

  @ApiProperty({
    description: 'Lista de times associados ao clube',
    type: [String],
    example: ['idTime1', 'idTime2'],
  })
  @IsArray()
  teams: string[];

  @ApiProperty({
    description: 'Lista de jogadores do clube',
    type: [String],
    example: ['idJogador1', 'idJogador2'],
  })
  @IsArray()
  players: string[];

  @ApiProperty({
    description: 'Lista de notícias relacionadas ao clube',
    type: [String],
    example: ['idNoticia1', 'idNoticia2'],
  })
  @IsArray()
  news: string[];

  @ApiProperty({
    description: 'Lista de utilizadores associados ao clube',
    type: [String],
    example: ['idUtilizador1', 'idUtilizador2'],
  })
  @IsArray()
  users: string[];

  @ApiProperty({
    description: 'Lista de grupos associados ao clube',
    type: [String],
    example: ['idGrupo1', 'idGrupo2'],
  })
  @IsArray()
  groups: string[];

  @ApiProperty({
    description: 'Lista de treinadores do clube',
    type: [String],
    example: ['idTreinador1', 'idTreinador2'],
  })
  @IsArray()
  coachs: string[];

  @ApiProperty({
    description: 'Data de criação do clube',
    example: '2023-08-21T10:20:30Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do clube',
    example: '2023-08-22T15:45:30Z',
  })
  @IsDate()
  updatedAt: Date;
}
