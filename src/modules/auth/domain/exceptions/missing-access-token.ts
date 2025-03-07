import { ExceptionCode } from '@/shared/domain/enums/exception-code';
import { UnauthorizedException } from '@/shared/domain/exceptions/unauthorized';

export class MissingAccessTokenException extends UnauthorizedException {
  public constructor() {
    super('Missing Access Token', ExceptionCode.MISSING_ACCESS_TOKEN);
  }
}
