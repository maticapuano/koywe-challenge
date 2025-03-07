import { ExceptionCode } from '@/shared/domain/enums/exception-code';
import { ConflictException } from '@/shared/domain/exceptions/conflict';

export class UserEmailTakenException extends ConflictException {
  public constructor() {
    super('email already exists', ExceptionCode.USER_EMAIL_TAKEN);
  }
}
