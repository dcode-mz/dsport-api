import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendOtpRequest {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@email.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
