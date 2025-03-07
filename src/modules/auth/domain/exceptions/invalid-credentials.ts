import { ExceptionCode } from '@/shared/domain/enums/exception-code';
import { UnauthorizedException } from '@/shared/domain/exceptions/unauthorized';

export class InvalidCredentialsException extends UnauthorizedException {
  public constructor() {
    super('Invalid credentials', ExceptionCode.INVALID_CREDENTIALS);
  }
}
