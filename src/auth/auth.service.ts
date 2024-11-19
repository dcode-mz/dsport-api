import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthCreateUserDto, UserDto } from './dto';
import * as nodemailer from 'nodemailer';
import * as speakeasy from 'speakeasy';
import { addSeconds } from 'date-fns';
import { UserResponse } from './dto/user.response';

@Injectable()
export class AuthService {
  private transporter;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '46580d5253041e',
        pass: 'edcf0e3f48715f',
      },
    });
  }

  async generateOtp(email: string): Promise<{ message: string }> {
    const user = await this.usersService.findOne(email);
    if (!user) throw new Error('Usuário não encontrado');
    const secret = speakeasy.generateSecret({ length: 20 }).base32;
    const otp = speakeasy.totp({ secret, digits: 4, step: 60 });
    const otpExpiry = addSeconds(new Date(), 60);

    await this.usersService.createUserOtp(user.id, otp, otpExpiry);
    await this.sendResetEmail(user.email, otp);

    return { message: 'OTP enviado para e-mail' };
  }

  async verifyOtp(email: string, otp: string): Promise<{ message: string }> {
    const userOtp = await this.usersService.findOneByUserOtp(email);
    // const user = await this.usersService.findOne(email);
    if (!userOtp) throw new NotFoundException('Usuário não encontrado');

    if (userOtp.userOtp.otp !== otp || new Date() > userOtp.userOtp.otpExpiry) {
      throw new UnauthorizedException('OTP inválido ou expirado');
    }

    return { message: 'OTP verificado, prossiga para redefinir a senha' };
  }

  async sendResetEmail(email: string, otp: string) {
    const mailOptions = {
      from: 'adolforicardo5@gmail.com',
      to: email,
      subject: 'OTP de redefinição de senha',
      text: `Seu OTP para redefinição de senha é: ${otp}`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async validateUser(email: string, pass: string): Promise<UserDto> {
    const user = await this.usersService.findOne(email);
    if (!user) return null;
    const passwordChecked = await bcrypt.compare(pass, user.password);
    if (!passwordChecked) return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async create(authCreateUserDto: AuthCreateUserDto): Promise<UserResponse> {
    const user = await this.usersService.create(authCreateUserDto);
    const { id, email, name, role } = user;
    return { id, email, name, role };
  }

  async login(user: UserDto): Promise<{ access_token: string }> {
    const payload = { name: user.name, email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async resetPassword(email: string, newPassword: string) {
    await this.usersService.updatePassword(email, newPassword);

    return { message: 'Redefinição de senha com sucesso' };
  }
}
