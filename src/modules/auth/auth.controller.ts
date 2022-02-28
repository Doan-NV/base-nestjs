import { Controller, Post, Body, Res, Get, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto, RegisterUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Get('ping')
  async ping() {
    return 'PONG';
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() payload: LoginDto, @Res() res: Response) {
    const { accessToken, refreshToken, expires } = await this.authService.login(payload);
    res.cookie('JWT', 'Bearer ' + accessToken, {
      maxAge: expires,
      httpOnly: true,
    });
    res.json({ accessToken, refreshToken });
    return { accessToken, refreshToken };
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    type: Boolean,
    description: 'API to register user!',
  })
  async register(@Body() payload: RegisterUserDto, @Res() res: Response): Promise<any> {
    const data = await this.authService.register(payload);
    if (!data.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data,
      });
    }
    return res.status(HttpStatus.CREATED).json(data);
  }
}
