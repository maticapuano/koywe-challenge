import { Module } from '@nestjs/common';
import { ExchangeRateAdapter } from './domain/adapters/exchange-rate.adapter';
import { QuoteRepository } from './domain/repositories/quote.repository';
import { CryptoMktExchangeRateAdapterIml } from './infrastructure/adapters/exchange-rate/cryptomkt';
import { QuoteRepositoryIml } from './infrastructure/persistence/repositories/quote.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: QuoteRepository,
      useClass: QuoteRepositoryIml,
    },
    {
      provide: ExchangeRateAdapter,
      useClass: CryptoMktExchangeRateAdapterIml,
    },
  ],
  exports: [QuoteRepository, ExchangeRateAdapter],
})
export class QuotesModule {}
