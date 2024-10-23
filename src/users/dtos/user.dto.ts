import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsEmail, IsArray, IsDate } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'Identificador único do usuário',
    example: 'd1734aeb-3d14-4d5e-bf17-2b4bc3ebf67e',
  })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Nome do usuário', example: 'João Silva' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'ID do papel (role) do usuário',
    example: 'roleId123',
  })
  @IsUUID()
  roleId: string;

  @ApiProperty({
    description: 'Lista de identificadores dos esportes associados ao usuário',
    type: [String],
    example: ['sportId1', 'sportId2'],
  })
  @IsArray()
  sports: string[];

  @ApiProperty({
    description: 'Lista de identificadores dos torneios associados ao usuário',
    type: [String],
    example: ['tournamentId1', 'tournamentId2'],
  })
  @IsArray()
  tournament: string[];

  @ApiProperty({
    description: 'Lista de identificadores dos clubes associados ao usuário',
    type: [String],
    example: ['clubId1', 'clubId2'],
  })
  @IsArray()
  clubs: string[];

  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2023-01-15T12:00:00Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do usuário',
    example: '2024-10-11T10:30:00Z',
  })
  @IsDate()
  updatedAt: Date;
}
