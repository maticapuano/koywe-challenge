import { Quote } from '@/modules/quotes/domain/contracts/quote';
import { QuoteExpiredException } from '@/modules/quotes/domain/exceptions/quote-expired';
import { QuoteNotFoundException } from '@/modules/quotes/domain/exceptions/quote-not-found';
import { QuoteRepository } from '@/modules/quotes/domain/repositories/quote.repository';
import { DateAdapter } from '@/shared/domain/adapters/date.adapter';
import Decimal from 'decimal.js';
import { GetQuoteByIdCase } from '../get-quote.case';

describe('GetQuoteByIdCase', () => {
  let getQuoteByIdCase: GetQuoteByIdCase;
  let quoteRepository: jest.Mocked<QuoteRepository>;
  let dateAdapter: jest.Mocked<DateAdapter>;

  const mockQuote: Quote = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    from: 'USDT',
    to: 'ARS',
    amount: Decimal(6208.525),
    rate: Decimal(1241.705),
    convertedAmount: Decimal(5),
    expiresAt: new Date('2025-03-8T10:00:00Z'),
    createdAt: new Date('2025-03-8T09:00:00Z'),
  };

  beforeEach(() => {
    quoteRepository = {
      findById: jest.fn(),
      create: jest.fn(),
    } as jest.Mocked<QuoteRepository>;

    dateAdapter = {
      now: jest.fn(),
      addDays: jest.fn(),
      isBefore: jest.fn(),
      isAfter: jest.fn(),
      addMinutes: jest.fn(),
    };

    getQuoteByIdCase = new GetQuoteByIdCase(quoteRepository, dateAdapter);
  });

  it('should return a quote when it exists and is not expired', async () => {
    const currentDate = new Date('2025-03-10T09:30:00Z');

    quoteRepository.findById.mockResolvedValue(mockQuote);
    dateAdapter.now.mockReturnValue(currentDate);
    dateAdapter.isAfter.mockReturnValue(false);

    const result = await getQuoteByIdCase.execute(mockQuote.id);

    expect(result).toEqual(mockQuote);
    expect(quoteRepository.findById).toHaveBeenCalledWith(mockQuote.id);
    expect(dateAdapter.now).toHaveBeenCalled();
    expect(dateAdapter.isAfter).toHaveBeenCalledWith(
      currentDate,
      mockQuote.expiresAt,
    );
  });

  it('should throw QuoteNotFoundException when quote does not exist', async () => {
    quoteRepository.findById.mockResolvedValue(null);

    await expect(getQuoteByIdCase.execute('non-existent-id')).rejects.toThrow(
      QuoteNotFoundException,
    );

    expect(quoteRepository.findById).toHaveBeenCalledWith('non-existent-id');
  });

  it('should throw QuoteExpiredException when quote is expired', async () => {
    const currentDate = new Date('2025-03-10T11:00:00Z');

    quoteRepository.findById.mockResolvedValue(mockQuote);
    dateAdapter.now.mockReturnValue(currentDate);
    dateAdapter.isAfter.mockReturnValue(true);

    await expect(getQuoteByIdCase.execute(mockQuote.id)).rejects.toThrow(
      QuoteExpiredException,
    );

    expect(quoteRepository.findById).toHaveBeenCalledWith(mockQuote.id);
    expect(dateAdapter.now).toHaveBeenCalled();
    expect(dateAdapter.isAfter).toHaveBeenCalledWith(
      currentDate,
      mockQuote.expiresAt,
    );
  });
});
