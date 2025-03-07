import { HashPasswordAdapter } from '@/modules/users/domain/adapters/hash-password.adapter';
import { User } from '@/modules/users/domain/contracts/user';
import { UserRepository } from '@/modules/users/domain/repositories/user.repository';
import { Case } from '@/shared/domain/interfaces/case';
import { Injectable } from '@nestjs/common';
import { JwtAdapter } from '../../domain/adapters/jwt.adapter';
import { InvalidCredentialsException } from '../../domain/exceptions/invalid-credentials';

export interface SignInUseCaseInput {
  email: string;
  password: string;
}

export interface SignInUseCaseOutput {
  user: User;
  accessToken: string;
}

@Injectable()
export class SignInUseCase
  implements Case<SignInUseCaseInput, SignInUseCaseOutput>
{
  public constructor(
    private readonly _userRepository: UserRepository,
    private readonly _hashPasswordAdapter: HashPasswordAdapter,
    private readonly _jwtAdapter: JwtAdapter,
  ) {}

  public async execute(
    input: SignInUseCaseInput,
  ): Promise<SignInUseCaseOutput> {
    const user = await this._userRepository.findByEmail(input.email, {
      includePassword: true,
    });

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isPasswordValid = await this._hashPasswordAdapter.compare(
      input.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    const accessToken = await this._jwtAdapter.signAccessToken(user.id);

    return {
      user,
      accessToken,
    };
  }
}
