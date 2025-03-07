import { ExceptionCode } from '../enums/exception-code';
import { BadRequestException } from './bad-request';

export class InvalidArgumentException extends BadRequestException {
  public constructor(message: string, code: ExceptionCode = ExceptionCode.INVALID_ARGUMENT) {
    super(message, code);
  }
}
