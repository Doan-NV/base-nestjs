import { HttpStatus, Injectable } from '@nestjs/common';
import { TokenHelper } from 'src/helpers/token.helper';
import { ConfigService } from 'src/shared/config/config.service';

import { UserService } from '../users/users.service';

import { LoginDto, RegisterUserDto, RegistrationStatus } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private configService: ConfigService) {}

  async login(params: LoginDto) {
    const user = await this.userService.findUserById();
    return this._generateToken(user.id);
  }

  async verifyUser(id: string) {
    return this.userService.findUserById(id);
  }

  async register(params: RegisterUserDto) {
    // validate
    const message = await this.userService.validateUser(params);
    const resposeData: RegistrationStatus = {
      success: true,
      message: 'user register',
      user: null,
    };

    if (message !== null) {
      resposeData.success = false;
      resposeData.message = message;
    } else {
      const userRegister = await this.userService.createUser(params);
      console.log('userRegister: ', userRegister);
      if (!userRegister) {
        resposeData.success = false;
        resposeData.message = 'register error!';
      } else {
        resposeData.user = userRegister;
      }
    }
    return resposeData;
  }

  private _generateToken(id: string) {
    const payload = {
      id,
    };
    const secret = this.configService.accessTokenSecret;
    const expiresIn = this.configService.accessTokenExpires;
    const { token: accessToken, expires } = TokenHelper.generate(payload, secret, expiresIn);
    const refreshToken = this._generateRefreshToken(id);

    return {
      accessToken,
      expires,
      refreshToken,
    };
  }

  private _generateRefreshToken(id: string) {
    return `refresh-token-${id}`;
  }
}
