import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsUUID } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'João Silva' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'senhaSegura123' })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'ID do papel (role) do usuário',
    example: 'roleId123',
  })
  @IsUUID()
  roleId: string;
}