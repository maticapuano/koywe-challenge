import { ExceptionCode } from '@/shared/domain/enums/exception-code';
import { NotFoundException } from '@/shared/domain/exceptions/not-found';

export class QuoteNotFoundException extends NotFoundException {
  public constructor() {
    super('Quote not found', ExceptionCode.QUOTE_NOT_FOUND);
  }
}
