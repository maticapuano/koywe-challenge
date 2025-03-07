import { User } from '@/modules/users/domain/contracts/user';
import { UserService } from '@/modules/users/domain/services/user.service';
import { Case } from '@/shared/domain/interfaces/case';
import { Injectable } from '@nestjs/common';
import { JwtAdapter } from '../../domain/adapters/jwt.adapter';

export interface SignUpUseCaseInput {
  name: string;
  email: string;
  password: string;
}

export interface SignUpUseCaseOutput {
  user: User;
  accessToken: string;
}

@Injectable()
export class SignUpUseCase
  implements Case<SignUpUseCaseInput, SignUpUseCaseOutput>
{
  public constructor(
    private readonly _userService: UserService,
    private readonly _jwtAdapter: JwtAdapter,
  ) {}

  public async execute(
    input: SignUpUseCaseInput,
  ): Promise<SignUpUseCaseOutput> {
    const user = await this._userService.create(input);
    const accessToken = await this._jwtAdapter.signAccessToken(user.id);

    return {
      user,
      accessToken,
    };
  }
}
