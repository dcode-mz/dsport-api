export class UserDto {
  id: string;
  name: string;
  email: string;
  password?: string;
  otp?: string;
  otpExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
}
