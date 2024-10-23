import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsInt,
  IsOptional,
  IsDate,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class MatchEventPlayerDto {
  @ApiProperty({
    description: 'ID do jogador envolvido no evento',
    example: 'player1-uuid',
  })
  @IsUUID()
  playerId: string;

  @ApiProperty({
    description: 'Nome do jogador envolvido no evento',
    example: 'John Doe',
  })
  @IsString()
  playerName: string;

  @ApiProperty({
    description: 'Papel do jogador no evento',
    example: 'Autor do Gol',
  })
  @IsString()
  role: string;
}

export class MatchEventDto {
  @ApiProperty({
    description: 'ID do evento de partida',
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'ID do tipo de evento do jogo',
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
  })
  @IsUUID()
  typeId: string;

  @ApiProperty({
    description: 'Tempo do evento no jogo (em minutos)',
    example: 45,
  })
  @IsInt()
  time: number;

  @ApiProperty({
    description: 'Detalhes adicionais do evento',
    example: 'Cartão amarelo dado ao jogador por falta',
    required: false,
  })
  @IsOptional()
  @IsString()
  details?: string;

  @ApiProperty({
    description: 'ID da partida relacionada ao evento',
    example: 'm1n2o3p4-q5r6-s7t8-u9v0-w1x2y3z4a5b6',
  })
  @IsUUID()
  matchId: string;

  @ApiProperty({
    description: 'Lista de jogadores envolvidos no evento e seus papéis',
    example: [
      {
        playerId: 'player1-uuid',
        playerName: 'John Doe',
        role: 'Autor do Gol',
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MatchEventPlayerDto)
  players: MatchEventPlayerDto[];

  @ApiProperty({
    description: 'Data de criação do evento',
    example: '2023-01-15T12:00:00Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Data de última atualização do evento',
    example: '2024-10-11T10:30:00Z',
  })
  @IsDate()
  updatedAt: Date;
}
