import { CreateQuote, Quote } from '@/modules/quotes/domain/contracts/quote';
import { QuoteRepository } from '@/modules/quotes/domain/repositories/quote.repository';
import { PrismaService } from '@/shared/core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuoteRepositoryIml implements QuoteRepository {
  public constructor(private readonly _prismaService: PrismaService) {}

  public async create(quote: CreateQuote): Promise<Quote> {
    return this._prismaService.quote.create({
      data: quote,
    });
  }

  public async findById(id: string): Promise<Quote | null> {
    const quote = await this._prismaService.quote.findFirst({
      where: {
        id,
      },
    });

    return quote ?? null;
  }
}
