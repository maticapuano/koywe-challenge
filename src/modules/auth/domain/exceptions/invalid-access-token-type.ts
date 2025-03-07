import { ExceptionCode } from '@/shared/domain/enums/exception-code';
import { UnauthorizedException } from '@/shared/domain/exceptions/unauthorized';

export class InvalidAccessTokenTypeException extends UnauthorizedException {
  public constructor() {
    super('Invalid access token type', ExceptionCode.INVALID_ACCESS_TOKEN_TYPE);
  }
}
