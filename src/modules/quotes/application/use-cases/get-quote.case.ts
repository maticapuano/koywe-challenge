import { DateAdapter } from '@/shared/domain/adapters/date.adapter';
import { Case } from '@/shared/domain/interfaces/case';
import { Injectable } from '@nestjs/common';
import { Quote } from '../../domain/contracts/quote';
import { QuoteExpiredException } from '../../domain/exceptions/quote-expired';
import { QuoteNotFoundException } from '../../domain/exceptions/quote-not-found';
import { QuoteRepository } from '../../domain/repositories/quote.repository';

@Injectable()
export class GetQuoteByIdCase implements Case<string, Quote> {
  public constructor(
    private readonly _quoteRepository: QuoteRepository,
    private readonly _dateAdapter: DateAdapter,
  ) {}

  public async execute(id: string): Promise<Quote> {
    const quote = await this._quoteRepository.findById(id);

    if (!quote) {
      throw new QuoteNotFoundException();
    }

    if (this._dateAdapter.isAfter(this._dateAdapter.now(), quote.expiresAt)) {
      throw new QuoteExpiredException();
    }

    return quote;
  }
}
