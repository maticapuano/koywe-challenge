import { Injectable } from '@nestjs/common';
import { HashPasswordAdapter } from '../adapters/hash-password.adapter';
import { CreateUser, User } from '../contracts/user';
import { UserEmailTakenException } from '../exceptions/user-email-taken';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  public constructor(
    private readonly _userRepository: UserRepository,
    private readonly _hashPasswordAdapter: HashPasswordAdapter,
  ) {}

  public async create(data: CreateUser): Promise<User> {
    const exists = await this._userRepository.findByEmail(data.email);

    if (exists) {
      throw new UserEmailTakenException();
    }

    const passwordHashed = await this._hashPasswordAdapter.hash(data.password);

    const user = await this._userRepository.create({
      ...data,
      password: passwordHashed,
    });

    return user;
  }
}
