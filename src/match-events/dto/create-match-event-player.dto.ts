import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateMatchEventPlayerDto {
  @ApiProperty({
    description: 'ID do jogador envolvido no evento',
    example: 'player1-uuid',
  })
  @IsUUID()
  playerId: string;

  @ApiProperty({
    description: 'Papel do jogador no evento',
    example: 'Autor do Gol',
  })
  @IsString()
  role: string;
}
