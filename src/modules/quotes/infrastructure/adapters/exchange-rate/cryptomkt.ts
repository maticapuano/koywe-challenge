import { ExchangeRateAdapter } from '@/modules/quotes/domain/adapters/exchange-rate.adapter';
import { InvalidArgumentException } from '@/shared/domain/exceptions/invalid-argument';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';

@Injectable()
export class CryptoMktExchangeRateAdapterIml implements ExchangeRateAdapter {
  private readonly _logger = new Logger(CryptoMktExchangeRateAdapterIml.name);
  private readonly _baseUrl = 'https://api.exchange.cryptomkt.com';

  public constructor(private readonly _httpService: HttpService) {
    this._logger.log('Instantiating CryptoMktExchangeRateAdapterIml...');
  }

  public async getRate(from: string, to: string): Promise<number> {
    this._logger.log('Getting rate...');

    const url = `${this._baseUrl}/api/3/public/price/rate`;
    const result = await firstValueFrom(
      this._httpService
        .get(url, {
          params: {
            from,
            to,
          },
        })
        .pipe(
          map((response) => {
            if (!response.data[from]?.price) {
              throw new InvalidArgumentException(
                'Sorry, we could not find the rate',
              );
            }

            return {
              rate: Number(response.data[from]?.price),
            };
          }),
          catchError((error) => {
            this._logger.error('REQUEST FAIL:', error);

            throw new InvalidArgumentException(
              error.response?.data?.error?.message ??
                'Sorry, we could not find the rate',
            );
          }),
        ),
    );

    this._logger.log(`Rate: ${result.rate}`);

    return result.rate;
  }
}
