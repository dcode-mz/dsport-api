import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthCreateUserDto, UserDto } from './dto';
import { Response } from 'express';
import { ResponseBody } from 'src/common/dto/ResponseBody';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';

class CreateUserResponse {
  user: UserDto;
  access_token: string;
}

class LoginResponse {
  user: UserDto;
  access_token: string;
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post('sign-up')
  async create(
    @Body() authCreateUserDto: AuthCreateUserDto,
    @Res() res: Response,
  ) {
    const user = await this.authService.create(authCreateUserDto);
    const { access_token } = await this.authService.login(user);
    const response = new ResponseBody<CreateUserResponse>(
      'Usuário criado com sucesso',
      { user, access_token },
      true,
    );
    res.status(HttpStatus.CREATED).json(response);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const user = req.user as UserDto;
    const { access_token } = await this.authService.login(user);
    const response = new ResponseBody<LoginResponse>(
      'Logado com sucesso',
      { user, access_token },
      true,
    );
    res.status(HttpStatus.OK).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('send-otp')
  async sendOtp(@Body('email') email: string, @Res() res: Response) {
    const { message } = await this.authService.generateOtp(email);
    const response = new ResponseBody<{ message: string }>(message, null, true);
    res.status(HttpStatus.OK).json(response);
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body('email') email: string,
    @Body('otp') otp: string,
    @Res() res: Response,
  ) {
    const { message } = await this.authService.verifyOtp(email, otp);
    const response = new ResponseBody<{ message: string }>(message, null, true);
    res.status(HttpStatus.OK).json(response);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('newPassword') newPassword: string,
    @Res() res: Response,
  ) {
    const { message } = await this.authService.resetPassword(
      email,
      newPassword,
    );
    const response = new ResponseBody<{ message: string }>(message, null, true);
    res.status(HttpStatus.OK).json(response);
  }
}
