import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRateAdapter } from '../../adapters/exchange-rate.adapter';
import { QuoteCurrencyCode } from '../../enums/currency-codes';
import { QuoteService } from '../quote.service';

describe('QuoteService', () => {
  let service: QuoteService;
  let exchangeRateAdapter: jest.Mocked<ExchangeRateAdapter>;

  beforeEach(async () => {
    const mockExchangeRateAdapter = {
      getRate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuoteService,
        {
          provide: ExchangeRateAdapter,
          useValue: mockExchangeRateAdapter,
        },
      ],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
    exchangeRateAdapter = module.get(ExchangeRateAdapter);
  });

  describe('getRate', () => {
    it('should return exchange rate from adapter', async () => {
      const from = QuoteCurrencyCode.ARS;
      const to = QuoteCurrencyCode.USDT;
      const expectedRate = 1200;

      exchangeRateAdapter.getRate.mockResolvedValue(expectedRate);

      const result = await service.getRate(from, to);

      expect(result).toBe(expectedRate);
      expect(exchangeRateAdapter.getRate).toHaveBeenCalledWith(from, to);
    });

    it('should propagate errors from adapter', async () => {
      const from = QuoteCurrencyCode.ARS;
      const to = 'INVALID_CURRENCY';
      const error = new Error('Sorry, we could not find the rate');

      exchangeRateAdapter.getRate.mockRejectedValue(error);

      await expect(service.getRate(from, to)).rejects.toThrow(error);

      expect(exchangeRateAdapter.getRate).toHaveBeenCalledWith(from, to);
    });
  });

  describe('convert', () => {
    it('should convert amount using exchange rate from adapter', async () => {
      const amount = 100;
      const from = QuoteCurrencyCode.ARS;
      const to = QuoteCurrencyCode.USDT;
      const rate = 1200;

      exchangeRateAdapter.getRate.mockResolvedValue(rate);

      const result = await service.convert(amount, from, to);

      expect(result).toBe(amount * rate);
      expect(exchangeRateAdapter.getRate).toHaveBeenCalledWith(from, to);
    });

    it('should handle zero amount conversion', async () => {
      const amount = 0;
      const from = QuoteCurrencyCode.ARS;
      const to = QuoteCurrencyCode.USDT;
      const rate = 1200;

      exchangeRateAdapter.getRate.mockResolvedValue(rate);

      const result = await service.convert(amount, from, to);

      expect(result).toBe(0);
      expect(exchangeRateAdapter.getRate).toHaveBeenCalledWith(from, to);
    });

    it('should convert using crypto currency to fiat currency', async () => {
      const from = QuoteCurrencyCode.BTC;
      const to = QuoteCurrencyCode.ARS;

      const amount = 100;
      const rate = 101672161.5;

      exchangeRateAdapter.getRate.mockResolvedValue(rate);

      const result = await service.convert(amount, from, to);

      expect(result).toBe(amount * rate);
      expect(exchangeRateAdapter.getRate).toHaveBeenCalledWith(from, to);
      expect(result).toBe(amount * rate);
    });

    it('should propagate errors from adapter during conversion', async () => {
      const amount = 100;
      const from = QuoteCurrencyCode.ARS;
      const to = 'INVALID_CURRENCY';
      const error = new Error('Sorry, we could not find the rate');

      exchangeRateAdapter.getRate.mockRejectedValue(error);

      await expect(service.convert(amount, from, to)).rejects.toThrow(error);
      expect(exchangeRateAdapter.getRate).toHaveBeenCalledWith(from, to);
    });
  });
});
