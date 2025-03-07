import { Module } from '@nestjs/common';
import { CreateQuoteCase } from './application/use-cases/create-quote.case';
import { GetQuoteByIdCase } from './application/use-cases/get-quote.case';
import { ExchangeRateAdapter } from './domain/adapters/exchange-rate.adapter';
import { QuoteRepository } from './domain/repositories/quote.repository';
import { QuoteService } from './domain/services/quote.service';
import { CryptoMktExchangeRateAdapterIml } from './infrastructure/adapters/exchange-rate/cryptomkt';
import { QuoteController } from './infrastructure/http/api/v1/controllers/quote.controller';
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
    QuoteService,
    CreateQuoteCase,
    GetQuoteByIdCase,
  ],
  controllers: [QuoteController],
  exports: [QuoteRepository, ExchangeRateAdapter],
})
export class QuotesModule {}
