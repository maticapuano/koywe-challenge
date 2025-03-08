import { CreateQuote, Quote } from '../contracts/quote';

export abstract class QuoteRepository {
  /**
   * Creates a new quote
   * @param quote The quote data to create
   * @returns Promise containing the created quote
   */
  public abstract create(quote: CreateQuote): Promise<Quote>;

  /**
   * Finds a quote by its ID
   * @param id The ID of the quote to find
   * @returns Promise containing the quote if found, null otherwise
   */
  public abstract findById(id: string): Promise<Quote | null>;
}
