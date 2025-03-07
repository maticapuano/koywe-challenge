export abstract class ExchangeRateAdapter {
  /**
   * Gets the exchange rate between two currencies
   * @param from The source currency code
   * @param to The target currency code
   * @returns Promise that resolves to the exchange rate as a number
   */
  public abstract getRate(from: string, to: string): Promise<number>;
}
