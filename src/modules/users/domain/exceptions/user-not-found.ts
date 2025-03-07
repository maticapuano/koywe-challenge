import { ExceptionCode } from '@/shared/domain/enums/exception-code';
import { NotFoundException } from '@/shared/domain/exceptions/not-found';

export class UserNotFoundException extends NotFoundException {
  public constructor() {
    super('User not found', ExceptionCode.USER_NOT_FOUND);
  }
}
