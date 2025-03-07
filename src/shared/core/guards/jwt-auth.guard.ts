import { JwtAdapter } from '@/modules/auth/domain/adapters/jwt.adapter';
import { InvalidAccessTokenTypeException } from '@/modules/auth/domain/exceptions/invalid-access-token-type';
import { MissingAccessTokenException } from '@/modules/auth/domain/exceptions/missing-access-token';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/is-public';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  public constructor(
    private readonly _jwtAdapter: JwtAdapter,
    private readonly _reflector: Reflector,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const token = this._extractTokenFromHeader(request);

    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    if (!token) {
      throw new MissingAccessTokenException();
    }

    const userId = await this._jwtAdapter.verifyAccessToken(token);

    request.userId = userId;

    return true;
  }

  private _extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];

    if (!type || !token) {
      return undefined;
    }

    if (type !== 'Bearer') {
      throw new InvalidAccessTokenTypeException();
    }

    return token;
  }
}
