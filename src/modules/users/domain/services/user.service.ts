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

  /**
   * Creates a new user
   * @param data - User creation data containing email and password
   * @throws {UserEmailTakenException} When the email is already registered
   * @returns Promise containing the created user
   */
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
