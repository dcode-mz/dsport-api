import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dtos/user.dto';

interface AddSportUserDto {userId: string, sportId: string}

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async findOne(email: string): Promise<UserDto> {
        return await this.prismaService.user.findUnique({
            where: {
                email
            },
        });
    }

    async create(createUserDto: CreateUserDto): Promise<UserDto> {

        const passEncrypted = await bcrypt.hash(createUserDto.password, 12)
        createUserDto.password = passEncrypted
        try {
            const user = await this.prismaService.user.create({
                data: createUserDto
            });

            return user;
        } catch (error) {
            if (error instanceof ConflictException) {
                // this.logger.log("Já existe usuário com este endereço de email: " + error);
                throw new ConflictException("Já existe usuário com este endereço de email")
            }
            throw new InternalServerErrorException("Não foi possível criar o usuário")
        }
    }   
    
    async addSportOnUser ({userId, sportId}: AddSportUserDto): Promise<UserDto> {
        try {
            const user = await this.prismaService.user.update({
                where: {
                    id: userId, // d36e6926-3a3a-4daf-88f8-a7dde25e0376
                },
                data: {
                    sports: {
                        connect: {
                            id: sportId // ed66f73c-a0f6-4d1a-8a54-0b63c1a271bc
                        }
                    }
                }
            });
            
            return user;
            // return { msg: "Adicinado o desporto ao usuário com sucesso", payload: user, successful: true };
        } catch (error) {
            throw new BadRequestException({ msg: "Não foi possível adicionar o desporto ao usuário", successful: false })
        }
    }
}

