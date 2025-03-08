import { ExceptionCode } from '@/shared/domain/enums/exception-code';
import { BadRequestException } from '@/shared/domain/exceptions/bad-request';

export class QuoteSameCurrencyException extends BadRequestException {
  public constructor() {
    super(
      'From and to currencies must be different',
      ExceptionCode.QUOTE_SAME_CURRENCY,
    );
  }
}
