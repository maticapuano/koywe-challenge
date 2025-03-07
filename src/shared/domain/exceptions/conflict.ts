import { HttpStatus } from '@nestjs/common';
import { ExceptionCode } from '../enums/exception-code';
import { DomainException } from './exception';

export class ConflictException extends DomainException {
  public constructor(
    message: string,
    code: ExceptionCode = ExceptionCode.CONFLICT,
  ) {
    super(message, code, HttpStatus.CONFLICT);
  }
}
