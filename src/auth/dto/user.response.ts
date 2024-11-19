import { UserRoleDto } from './user-role.dto';

export class UserResponse {
  id: string;
  name: string;
  email: string;
  role: UserRoleDto;
}
