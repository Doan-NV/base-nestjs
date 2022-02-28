import { IsEmail, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { IsMatchPattern } from 'src/common/validators/IsMatchPattern.validation';
import { PASSWORD_PATTERN } from 'src/constants/base.constant';
import { UserDocument } from 'src/modules/users/schema/users.schema';

export class LoginDto {
  @IsString()
  @IsEmail()
  @MaxLength(254)
  email: string;

  @IsString()
  @IsMatchPattern(PASSWORD_PATTERN)
  password: string;
}

export class RegisterUserDto {
  @IsString()
  @IsEmail()
  @MaxLength(254)
  email: string;

  @IsString()
  @IsMatchPattern(PASSWORD_PATTERN)
  password: string;

  @IsString()
  @MaxLength(40)
  @MinLength(3)
  username: string;

  @IsNumber()
  code: number;

  @IsString()
  @MinLength(2)
  @MaxLength(40)
  firstname: string;

  @IsString()
  @MinLength(2)
  @MaxLength(40)
  lastname: string;
}

export class RegistrationStatus {
  success: boolean;
  message: string;
  user?: UserDocument;
}
