import { QuoteCurrencyCode } from '@/modules/quotes/domain/enums/currency-codes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetQuoteDto {
  @ApiProperty({ format: 'uuid' })
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  public id: string;
}

export class QuoteResponseDto {
  @ApiProperty({ format: 'uuid' })
  public id: string;

  @ApiProperty({ enum: QuoteCurrencyCode })
  public from: QuoteCurrencyCode;

  @ApiProperty({ enum: QuoteCurrencyCode })
  public to: QuoteCurrencyCode;

  @ApiProperty({ example: 1 })
  public amount: number;

  @ApiProperty({ example: 1 })
  public rate: number;

  @ApiProperty({ example: 1 })
  public convertedAmount: number;

  @ApiProperty({ format: 'date-time' })
  public timestamp: Date;

  @ApiProperty({ format: 'date-time' })
  public expiresAt: Date;
}
