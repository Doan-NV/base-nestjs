import { Injectable } from '@nestjs/common';
import { messageError } from 'src/messages';

import { UserRepository } from './users.repository';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}
  findUserById(id?: string) {
    return this.repo.findById(id || '123');
  }

  async validateUser(data: any) {
    let message = null;
    const { username, email } = data;
    const usernameAlreadyExists = await this.repo.findOne({ username });
    if (usernameAlreadyExists) {
      message = messageError.USERNAME_ALREADY_EXIST;
      return message;
    }
    const emailAlreadyExists = await this.repo.findOne({ email });
    if (emailAlreadyExists) {
      message = messageError.EMAIL_ALREADY_EXIST;
      return message;
    }
  }

  async createUser(data: any) {
    try {
      const newUser = await this.repo.create(data);
      return newUser;
    } catch (error) {
      return null;
    }
  }
}
