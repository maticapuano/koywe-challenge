import { ExceptionCode } from '@/shared/domain/enums/exception-code';
import { UnauthorizedException } from '@/shared/domain/exceptions/unauthorized';

export class InvalidAccessTokenException extends UnauthorizedException {
  public constructor() {
    super('Invalid Access Token', ExceptionCode.INVALID_ACCESS_TOKEN);
  }
}
