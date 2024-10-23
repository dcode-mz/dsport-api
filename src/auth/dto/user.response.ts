export class UserResponse {
  id: string;
  name: string;
  email: string;
  password?: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
}
