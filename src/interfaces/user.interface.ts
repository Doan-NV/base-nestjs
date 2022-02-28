import { UserType } from 'src/modules/users/enum/users.enum';

export interface IUser {
  id: string;
  phone: string;
  name: string;
  email: string;
  user_type: UserType;
}
