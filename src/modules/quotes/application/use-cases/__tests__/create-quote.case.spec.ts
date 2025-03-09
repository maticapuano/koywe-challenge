import { Quote } from '@/modules/quotes/domain/contracts/quote';
import { QuoteCurrencyCode } from '@/modules/quotes/domain/enums/currency-codes';
import { QuoteSameCurrencyException } from '@/modules/quotes/domain/exceptions/quote-same-currency.exception';
import { QuoteRepository } from '@/modules/quotes/domain/repositories/quote.repository';
import { QuoteService } from '@/modules/quotes/domain/services/quote.service';
import { EnvService } from '@/shared/core/env/env.service';
import { DateAdapter } from '@/shared/domain/adapters/date.adapter';
import Decimal from 'decimal.js';
import { CreateQuoteCase } from '../create-quote.case';

describe('CreateQuoteCase', () => {
  let createQuoteCase: CreateQuoteCase;
  let quoteRepository: jest.Mocked<QuoteRepository>;
  let quoteService: jest.Mocked<QuoteService>;
  let dateAdapter: jest.Mocked<DateAdapter>;
  let envService: jest.Mocked<EnvService>;

  const mockDate = new Date('2024-01-01T12:00:00Z');
  const mockExpiryDate = new Date('2024-01-01T12:15:00Z');
  const mockRate = 0.00080447;

  beforeEach(() => {
    quoteRepository = {
      create: jest.fn(),
    } as any;

    quoteService = {
      getRate: jest.fn(),
      convert: jest.fn().mockImplementation((amount) => {
        return amount * mockRate;
      }),
    } as any;

    dateAdapter = {
      now: jest.fn().mockReturnValue(mockDate),
      addMinutes: jest.fn().mockReturnValue(mockExpiryDate),
    } as any;

    envService = {
      get: jest.fn().mockReturnValue(15), // 15 minutes expiry
    } as any;

    createQuoteCase = new CreateQuoteCase(
      quoteRepository,
      quoteService,
      dateAdapter,
      envService,
    );
  });

  it('should create a quote successfully', async () => {
    const input = {
      amount: 100,
      from: QuoteCurrencyCode.ARS,
      to: QuoteCurrencyCode.USDT,
    };

    const mockConvertedAmount = 100 * mockRate;

    quoteService.getRate.mockResolvedValue(mockRate);
    quoteService.convert.mockResolvedValue(mockConvertedAmount);

    const expectedQuote: Quote = {
      id: '22131d01-f031-435d-89b0-e9ea21913fa7',
      from: input.from,
      to: input.to,
      amount: new Decimal(mockConvertedAmount),
      convertedAmount: new Decimal(input.amount),
      rate: new Decimal(mockRate),
      expiresAt: mockExpiryDate,
      createdAt: mockDate,
    };

    quoteRepository.create.mockResolvedValue(expectedQuote);

    const result = await createQuoteCase.execute(input);

    expect(result).toEqual(expectedQuote);
    expect(result.amount).toEqual(new Decimal(mockConvertedAmount));
    expect(result.convertedAmount).toEqual(new Decimal(input.amount));
    expect(result.rate).toEqual(new Decimal(mockRate));
    expect(result.createdAt).toEqual(mockDate);
    expect(result.expiresAt).toEqual(mockExpiryDate);

    expect(quoteService.getRate).toHaveBeenCalledWith(input.from, input.to);
    expect(quoteService.convert).toHaveBeenCalledWith(
      input.amount,
      input.from,
      input.to,
    );

    expect(dateAdapter.now).toHaveBeenCalled();
    expect(dateAdapter.addMinutes).toHaveBeenCalledWith(mockDate, 15);
    expect(envService.get).toHaveBeenCalledWith('QUOTE_EXPIRES_IN_MINUTES');

    expect(quoteRepository.create).toHaveBeenCalledWith({
      amount: new Decimal(mockConvertedAmount),
      convertedAmount: new Decimal(input.amount),
      expiresAt: mockExpiryDate,
      from: input.from,
      rate: new Decimal(mockRate),
      to: input.to,
    });
  });

  it('should create a quote from crypto currency to fiat currency', async () => {
    const input = {
      amount: 100,
      from: QuoteCurrencyCode.BTC,
      to: QuoteCurrencyCode.ARS,
    };

    const btcRate = 101672161.5;
    const mockConvertedAmount = input.amount * btcRate;

    quoteService.getRate.mockResolvedValue(btcRate);
    quoteService.convert.mockResolvedValue(mockConvertedAmount);

    const expectedQuote: Quote = {
      id: '85598518-3544-416e-9071-007e7d64c742',
      amount: new Decimal(mockConvertedAmount),
      convertedAmount: new Decimal(input.amount),
      expiresAt: mockExpiryDate,
      from: input.from,
      rate: new Decimal(btcRate),
      to: input.to,
      createdAt: mockDate,
    };

    quoteRepository.create.mockResolvedValue(expectedQuote);

    const result = await createQuoteCase.execute(input);

    expect(result).toEqual(expectedQuote);
    expect(result.amount).toEqual(new Decimal(mockConvertedAmount));
    expect(result.convertedAmount).toEqual(new Decimal(input.amount));
    expect(result.rate).toEqual(new Decimal(btcRate));
    expect(result.createdAt).toEqual(mockDate);
    expect(result.expiresAt).toEqual(mockExpiryDate);
    expect(quoteService.getRate).toHaveBeenCalledWith(input.from, input.to);
    expect(quoteService.convert).toHaveBeenCalledWith(
      input.amount,
      input.from,
      input.to,
    );
    expect(dateAdapter.now).toHaveBeenCalled();
    expect(dateAdapter.addMinutes).toHaveBeenCalledWith(mockDate, 15);
    expect(envService.get).toHaveBeenCalledWith('QUOTE_EXPIRES_IN_MINUTES');
    expect(quoteRepository.create).toHaveBeenCalledWith({
      amount: new Decimal(mockConvertedAmount),
      convertedAmount: new Decimal(input.amount),
      expiresAt: mockExpiryDate,
      from: input.from,
      rate: new Decimal(btcRate),
      to: input.to,
    });
  });

  it('should throw QuoteSameCurrencyException when from and to currencies are the same', async () => {
    const input = {
      amount: 100,
      from: QuoteCurrencyCode.USDT,
      to: QuoteCurrencyCode.USDT,
    };

    await expect(createQuoteCase.execute(input)).rejects.toThrow(
      QuoteSameCurrencyException,
    );

    expect(quoteService.getRate).not.toHaveBeenCalled();
    expect(quoteService.convert).not.toHaveBeenCalled();
    expect(quoteRepository.create).not.toHaveBeenCalled();
  });

  it('should handle large numbers correctly', async () => {
    const input = {
      amount: 1000000,
      from: QuoteCurrencyCode.ARS,
      to: QuoteCurrencyCode.USDT,
    };

    const mockConvertedAmount = 1000000 * mockRate;

    quoteService.getRate.mockResolvedValue(mockRate);
    quoteService.convert.mockResolvedValue(mockConvertedAmount);

    const expectedQuote: Quote = {
      id: 'c4f5e39f-303d-4cf9-bd51-e4c2be020b9e',
      amount: new Decimal(mockConvertedAmount),
      convertedAmount: new Decimal(input.amount),
      expiresAt: mockExpiryDate,
      from: input.from,
      rate: new Decimal(mockRate),
      to: input.to,
      createdAt: mockDate,
    };

    quoteRepository.create.mockResolvedValue(expectedQuote);

    const result = await createQuoteCase.execute(input);

    expect(result).toEqual(expectedQuote);
    expect(result.amount).toEqual(new Decimal(mockConvertedAmount));
    expect(result.convertedAmount).toEqual(new Decimal(input.amount));
    expect(result.rate).toEqual(new Decimal(mockRate));
    expect(result.createdAt).toEqual(mockDate);
    expect(result.expiresAt).toEqual(mockExpiryDate);
  });
});
