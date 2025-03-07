import Decimal from 'decimal.js';

export interface Quote {
  id: string;
  from: string;
  to: string;
  amount: Decimal;
  rate: Decimal;
  convertedAmount: Decimal;
  createdAt: Date;
  expiresAt: Date;
}

export interface CreateQuote
  extends Pick<
    Quote,
    'from' | 'to' | 'amount' | 'rate' | 'convertedAmount' | 'expiresAt'
  > {}
