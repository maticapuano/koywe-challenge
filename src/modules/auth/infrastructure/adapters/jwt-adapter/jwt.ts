import { JwtAdapter } from '@/modules/auth/domain/adapters/jwt.adapter';
import { InvalidAccessTokenException } from '@/modules/auth/domain/exceptions/invalid-access-token';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAdapterIml implements JwtAdapter {
  public constructor(private readonly _jwtService: JwtService) {}

  public signAccessToken(subject: string): Promise<string> {
    return this._jwtService.signAsync({}, { subject });
  }

  public async verifyAccessToken(token: string): Promise<string> {
    try {
      const payload = await this._jwtService.verifyAsync(token);

      return payload.sub;
    } catch {
      throw new InvalidAccessTokenException();
    }
  }
}
