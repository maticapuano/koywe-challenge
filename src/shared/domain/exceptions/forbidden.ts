import { HttpStatus } from '@nestjs/common';
import { ExceptionCode } from '../enums/exception-code';
import { DomainException } from './exception';

export class ForbiddenException extends DomainException {
  public constructor(
    message: string,
    code: ExceptionCode = ExceptionCode.FORBIDDEN,
  ) {
    super(message, code, HttpStatus.FORBIDDEN);
  }
}
