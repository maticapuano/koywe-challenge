import { CreateQuote, Quote } from '@/modules/quotes/domain/contracts/quote';
import { QuoteCurrencyCode } from '@/modules/quotes/domain/enums/currency-codes';
import { PrismaService } from '@/shared/core/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import Decimal from 'decimal.js';
import { QuoteRepositoryIml } from '../quote.repository';

describe('QuoteRepositoryIml', () => {
  let repository: QuoteRepositoryIml;
  let prismaService: PrismaService;
  const currentRate = 0.0008047;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuoteRepositoryIml,
        {
          provide: PrismaService,
          useValue: {
            quote: {
              create: jest.fn(),
              findFirst: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<QuoteRepositoryIml>(QuoteRepositoryIml);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a quote successfully', async () => {
      const amount = 100;

      const createQuoteData: CreateQuote = {
        from: QuoteCurrencyCode.ARS,
        to: QuoteCurrencyCode.USDT,
        amount: Decimal(amount * currentRate),
        convertedAmount: Decimal(100),
        rate: Decimal(currentRate),
        expiresAt: new Date(),
      };

      const expectedQuote = {
        id: 'quote-1',
        ...createQuoteData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(prismaService.quote, 'create')
        .mockResolvedValue(expectedQuote);

      const result = await repository.create(createQuoteData);

      expect(prismaService.quote.create).toHaveBeenCalledWith({
        data: createQuoteData,
      });
      expect(result).toEqual(expectedQuote);
    });
  });

  describe('findById', () => {
    it('should find a quote by id successfully', async () => {
      const quoteId = 'quote-1';
      const amount = 100;

      const expectedQuote: Quote = {
        id: quoteId,
        from: QuoteCurrencyCode.ARS,
        to: QuoteCurrencyCode.USDT,
        rate: Decimal(currentRate),
        amount: Decimal(amount * currentRate),
        convertedAmount: Decimal(100),
        createdAt: new Date(),
        expiresAt: new Date(),
      };

      jest
        .spyOn(prismaService.quote, 'findFirst')
        .mockResolvedValue(expectedQuote);

      const result = await repository.findById(quoteId);

      expect(prismaService.quote.findFirst).toHaveBeenCalledWith({
        where: { id: quoteId },
      });
      expect(result).toEqual(expectedQuote);
    });

    it('should return null when quote is not found', async () => {
      const quoteId = 'non-existent-quote';

      jest.spyOn(prismaService.quote, 'findFirst').mockResolvedValue(null);

      const result = await repository.findById(quoteId);

      expect(prismaService.quote.findFirst).toHaveBeenCalledWith({
        where: { id: quoteId },
      });
      expect(result).toBeNull();
    });
  });
});
