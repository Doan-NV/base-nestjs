import { UserType } from 'src/modules/users/enum/users.enum';

export type IAuthPermission = UserType;

export interface IGenerateJWT {
  id: string;
}
