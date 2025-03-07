import { HashPasswordAdapter } from '@/modules/users/domain/adapters/hash-password.adapter';
import { InvalidArgumentException } from '@/shared/domain/exceptions/invalid-argument';
import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';

@Injectable()
export class BcryptHashPasswordAdapter implements HashPasswordAdapter {
  private readonly _maxPasswordLength = 72;
  private readonly _saltRounds = 10;

  public async hash(password: string): Promise<string> {
    if (password.length > this._maxPasswordLength) {
      throw new InvalidArgumentException('Password is too long to be hashed');
    }

    const salt = await genSalt(this._saltRounds);

    return await hash(password, salt);
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
