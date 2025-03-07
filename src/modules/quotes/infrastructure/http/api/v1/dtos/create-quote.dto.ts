import { QuoteCurrencyCode } from '@/modules/quotes/domain/enums/currency-codes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateQuoteDto {
  @ApiProperty({
    description: `Origin currency code (${Object.values(QuoteCurrencyCode)})`,
    enum: QuoteCurrencyCode,
    default: QuoteCurrencyCode.ARS,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(QuoteCurrencyCode)
  public from: QuoteCurrencyCode;

  @ApiProperty({
    description: `Destination currency code (${Object.values(QuoteCurrencyCode)})`,
    enum: QuoteCurrencyCode,
    default: QuoteCurrencyCode.ETH,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(QuoteCurrencyCode)
  public to: QuoteCurrencyCode;

  @ApiProperty({ example: 1000000 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  public amount: number;
}
