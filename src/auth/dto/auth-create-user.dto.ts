import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class AuthCreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'Adolfo',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'adolforicardo@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: '***',
  })
  @IsString()
  @IsNotEmpty()
  // @IsStrongPassword()
  password: string;
}
