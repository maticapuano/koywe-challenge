import { HttpStatus } from '@nestjs/common';
import { ExceptionCode } from '../enums/exception-code';
import { DomainException } from './exception';

export class InternalServerException extends DomainException {
  public constructor(
    message: string,
    code: ExceptionCode = ExceptionCode.UNKNOWN,
  ) {
    super(message, code, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
