import { HttpStatus } from '@nestjs/common';
import { ExceptionCode } from '../enums/exception-code';
import { DomainException } from './exception';

export class NotFoundException extends DomainException {
  public constructor(
    message: string,
    code: ExceptionCode = ExceptionCode.NOT_FOUND,
  ) {
    super(message, code, HttpStatus.NOT_FOUND);
  }
}
