import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthCreateUserDto, UserDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<UserDto> {
        const user = await this.usersService.findOne(email);
        if(!user) return null;
        const passwordChecked = await bcrypt.compare(pass, user.password);
        if(!passwordChecked) return null
        const { password, ...result } = user;
        return result;
    }

    async create(authCreateUserDto: AuthCreateUserDto): Promise<UserDto> {
        const user = await this.usersService.create(authCreateUserDto)
        // if (!user) throw new HttpException("Não foi possível criar a conta", HttpStatus.BAD_REQUEST);
        const { id, email, name, createdAt, updatedAt } = user ;
        return { id, email, name, createdAt, updatedAt }
    }

    async login(user: UserDto) {
        const payload = { name: user.name, email: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
