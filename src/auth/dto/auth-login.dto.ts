// import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  // @Exclude()
  @IsNotEmpty()
  @IsString()
  password: string;
}
