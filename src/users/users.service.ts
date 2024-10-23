import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserUserOtpDto } from './dtos/user-user-otp.dto';
import { UserDto } from 'src/auth/dto';
import { UserResponse } from 'src/auth/dto/user.response';

interface AddSportUserDto {
  userId: string;
  sportId: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(email: string): Promise<UserDto> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findOneByUserOtp(email: string): Promise<UserUserOtpDto> {
    const userWithOtpByEmail = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        userOtp: true,
      },
    });
    return userWithOtpByEmail;
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    const passEncrypted = await bcrypt.hash(createUserDto.password, 12);
    createUserDto.password = passEncrypted;
    try {
      const user = await this.prismaService.user.create({
        data: createUserDto,
      });

      return user;
    } catch (error) {
      // this.logger.log("Já existe usuário com este endereço de email: " + error);
      throw new ConflictException(
        'Já existe usuário com este endereço de email',
      );
    }
  }

  async createUserOtp(id: string, otp: string, otpExpiry: Date): Promise<any> {
    try {
      await this.prismaService.userOtp.create({
        data: {
          otp,
          otpExpiry,
          user: {
            connect: {
              id,
            },
          },
        },
      });
    } catch (error) {
      // this.logger.log("Já existe usuário com este endereço de email: " + error);
      throw new HttpException('Email não existe', HttpStatus.BAD_REQUEST);
    }
  }

  async updatePassword(email: string, newPassword: string): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      await this.prismaService.user.update({
        where: { email },
        data: {
          password: hashedPassword,
        },
      });

      const userOtp = await this.prismaService.userOtp.findFirst({
        where: {
          user: {
            email,
          },
        },
      });

      if (userOtp) {
        await this.prismaService.userOtp.delete({
          where: {
            id: userOtp.id,
          },
        });
      }
      return { message: 'Password reset successful' };
    } catch (error) {
      // this.logger.log("Já existe usuário com este endereço de email: " + error);
      throw new HttpException('Email não existe', HttpStatus.BAD_REQUEST);
    }
  }

  async addSportOnUser({ userId, sportId }: AddSportUserDto): Promise<UserDto> {
    try {
      const user = await this.prismaService.user.update({
        where: {
          id: userId, // d36e6926-3a3a-4daf-88f8-a7dde25e0376
        },
        data: {
          sports: {
            connect: {
              id: sportId, // ed66f73c-a0f6-4d1a-8a54-0b63c1a271bc
            },
          },
        },
      });

      return user;
      // return { msg: "Adicinado o desporto ao usuário com sucesso", payload: user, successful: true };
    } catch (error) {
      throw new BadRequestException({
        msg: 'Não foi possível adicionar o desporto ao usuário',
        successful: false,
      });
    }
  }
}
