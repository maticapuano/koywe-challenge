import { EnvService } from '@/shared/core/env/env.service';
import { DateAdapter } from '@/shared/domain/adapters/date.adapter';
import { Case } from '@/shared/domain/interfaces/case';
import { Injectable } from '@nestjs/common';
import Decimal from 'decimal.js';
import { Quote } from '../../domain/contracts/quote';
import { QuoteRepository } from '../../domain/repositories/quote.repository';
import { QuoteService } from '../../domain/services/quote.service';

export interface CreateQuoteCaseInput {
  amount: number;
  from: string;
  to: string;
}

@Injectable()
export class CreateQuoteCase implements Case<CreateQuoteCaseInput, Quote> {
  public constructor(
    private readonly _quoteRepository: QuoteRepository,
    private readonly _quoteService: QuoteService,
    private readonly _dateAdapter: DateAdapter,
    private readonly _envService: EnvService,
  ) {}

  public async execute(input: CreateQuoteCaseInput): Promise<Quote> {
    const expiresInMinutes = this._envService.get('QUOTE_EXPIRES_IN_MINUTES');

    const expiresAt = this._dateAdapter.addMinutes(
      this._dateAdapter.now(),
      expiresInMinutes,
    );

    const currentRate = await this._quoteService.getRate(input.from, input.to);
    const amount = await this._quoteService.convert(
      input.amount,
      input.from,
      input.to,
    );

    return this._quoteRepository.create({
      amount: Decimal(amount),
      convertedAmount: Decimal(input.amount),
      expiresAt,
      from: input.from,
      rate: Decimal(currentRate),
      to: input.to,
    });
  }
}
