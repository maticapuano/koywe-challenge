import { Quote } from '@/modules/quotes/domain/contracts/quote';
import { QuoteCurrencyCode } from '@/modules/quotes/domain/enums/currency-codes';
import { CreateQuoteResponseDto } from '../dtos/create-quote.dto';

export class CreateQuoteMapper {
  private constructor() {
    throw new Error('Cannot create instance of static class');
  }

  public static toDto(data: Quote): CreateQuoteResponseDto {
    return {
      id: data.id,
      from: QuoteCurrencyCode[data.from.trim()],
      to: QuoteCurrencyCode[data.to.trim()],
      amount: data.amount.toNumber(),
      rate: data.rate.toNumber(),
      convertedAmount: data.convertedAmount.toNumber(),
      timestamp: data.createdAt,
      expiresAt: data.expiresAt,
    };
  }
}
