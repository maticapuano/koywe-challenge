import { CreateQuote, Quote } from '../contracts/quote';

export abstract class QuoteRepository {
  abstract create(quote: CreateQuote): Promise<Quote>;
  abstract findById(id: string): Promise<Quote | null>;
}
