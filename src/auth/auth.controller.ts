import { Body, Controller, Get, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthCreateUserDto, UserDto } from './dto';
import { Response } from 'express';
import { ResponseBody } from 'src/dto/ResponseBody';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

class CreateUserResponse {
  user: UserDto;
  access_token: String;
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
    async create(@Body() authCreateUserDto: AuthCreateUserDto, @Res() res: Response) {
      try {
        const user = await this.authService.create(authCreateUserDto)
        const { access_token } = await this.authService.login(user)
        const response = new ResponseBody<CreateUserResponse>("Usuário criado com sucesso",  { user, access_token }, true);
        res.status(HttpStatus.CREATED).json(response);
      } catch(error: any) {
        const response = new ResponseBody(error.message,  null, false);
        res.status(error.status).json(response);
      }
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() login: UserDto, @Res() res: Response) {
      try{
        const { access_token } = await this.authService.login(login);
        const response = new ResponseBody<{access_token: String}>("Logado com sucesso", {access_token}, true);
        res.status(HttpStatus.OK).json(response);
      } catch(error: any) {
        const response = new ResponseBody(error.message,  null, false);
        res.status(error.status).json(response);
      }
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }

}
