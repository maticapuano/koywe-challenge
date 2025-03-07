import { ExceptionCode } from '@/shared/domain/enums/exception-code';
import { BadRequestException } from '@/shared/domain/exceptions/bad-request';

export class QuoteExpiredException extends BadRequestException {
  public constructor() {
    super('Sorry, the quote has expired', ExceptionCode.QUOTE_EXPIRED);
  }
}
