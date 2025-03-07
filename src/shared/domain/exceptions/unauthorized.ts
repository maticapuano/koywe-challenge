import { HttpStatus } from '@nestjs/common';
import { ExceptionCode } from '../enums/exception-code';
import { DomainException } from './exception';

export class UnauthorizedException extends DomainException {
  public constructor(
    message: string,
    code: ExceptionCode = ExceptionCode.UNAUTHORIZED,
  ) {
    super(message, code, HttpStatus.UNAUTHORIZED);
  }
}
