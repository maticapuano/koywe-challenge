import { HttpStatus } from '@nestjs/common';
import { ExceptionCode } from '../enums/exception-code';
import { DomainException } from './exception';

export class BadRequestException extends DomainException {
  public constructor(
    message: string,
    code: ExceptionCode = ExceptionCode.BAD_REQUEST,
  ) {
    super(message, code, HttpStatus.BAD_REQUEST);
  }
}
