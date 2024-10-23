import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsInt,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateMatchEventPlayerDto } from './create-match-event-player.dto';
import { Type } from 'class-transformer';

export class CreateMatchEventDto {
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
    example: [{ playerId: 'player1-uuid', role: 'Autor do Gol' }],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMatchEventPlayerDto)
  matchEventPlayer: CreateMatchEventPlayerDto[];
}
