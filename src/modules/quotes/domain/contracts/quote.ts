export interface Quote {
  id: string;
  from: string;
  to: string;
  amount: number;
  rate: number;
  convertedAmount: number;
  createdAt: Date;
  expiresAt: Date;
}

export interface CreateQuote
  extends Pick<
    Quote,
    'from' | 'to' | 'amount' | 'rate' | 'convertedAmount' | 'expiresAt'
  > {}
