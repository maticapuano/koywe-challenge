import { User } from '@/modules/users/domain/contracts/user';
import { UserRepository } from '@/modules/users/domain/repositories/user.repository';
import { Case } from '@/shared/domain/interfaces/case';
import { Injectable } from '@nestjs/common';
import { InvalidAccessTokenException } from '../../domain/exceptions/invalid-access-token';

export interface CurrentUserUseCaseInput {
  userId: string;
}

@Injectable()
export class CurrentUserUseCase implements Case<CurrentUserUseCaseInput, User> {
  public constructor(private readonly _userRepository: UserRepository) {}

  public async execute(input: CurrentUserUseCaseInput): Promise<User> {
    const user = await this._userRepository.findById(input.userId);

    if (!user) {
      throw new InvalidAccessTokenException();
    }

    return user;
  }
}
