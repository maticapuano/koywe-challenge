import { Injectable } from '@nestjs/common';
import { ExchangeRateAdapter } from '../adapters/exchange-rate.adapter';

@Injectable()
export class QuoteService {
  public constructor(
    private readonly _exchangeRateAdapter: ExchangeRateAdapter,
  ) {}

  /**
   * Gets the exchange rate from one currency to another.
   * @param from The source currency code.
   * @param to The target currency code.
   * @returns A promise that resolves to the exchange rate.
   */
  public async getRate(from: string, to: string): Promise<number> {
    return this._exchangeRateAdapter.getRate(from, to);
  }

  /**
   * Converts an amount from one currency to another using the exchange rate.
   * @param amount The amount to convert.
   * @param from The source currency code.
   * @param to The target currency code.
   * @returns A promise that resolves to the converted amount.
   */
  public async convert(
    amount: number,
    from: string,
    to: string,
  ): Promise<number> {
    const rate = await this._exchangeRateAdapter.getRate(from, to);

    return amount * rate;
  }
}
