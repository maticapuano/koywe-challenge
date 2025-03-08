import { CreateQuoteCase } from '@/modules/quotes/application/use-cases/create-quote.case';
import { GetQuoteByIdCase } from '@/modules/quotes/application/use-cases/get-quote.case';
import { ParseUUIDPipe } from '@/shared/core/pipes/parse-uuid.pipe';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateQuoteDto } from '../dtos/create-quote.dto';
import { QuoteResponseDto } from '../dtos/get-quote.dto';
import { QuoteMapper } from '../mappers/quote.mapper';

@Controller({
  path: '/quotes',
  version: '1',
})
@ApiTags('Quotes')
export class QuoteController {
  public constructor(
    private readonly _getQuoteByIdCase: GetQuoteByIdCase,
    private readonly _createQuoteCase: CreateQuoteCase,
  ) {}

  @Get('/:id')
  @ApiOkResponse({
    description: 'Quote found',
    type: QuoteResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Quote not found' })
  @ApiBadRequestResponse({ description: 'Quote expired' })
  @ApiUnauthorizedResponse({ description: 'Invalid access token' })
  @ApiOperation({ summary: 'Get quote by id' })
  @ApiBearerAuth()
  public async getById(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<QuoteResponseDto> {
    const result = await this._getQuoteByIdCase.execute(id);

    return QuoteMapper.toDto(result);
  }

  @Post('/')
  @ApiCreatedResponse({
    description: 'Quote created',
    type: QuoteResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Quote same currency' })
  @ApiOperation({ summary: 'Create quote ' })
  @ApiUnauthorizedResponse({ description: 'Invalid access token' })
  @ApiBearerAuth()
  public async create(@Body() data: CreateQuoteDto): Promise<QuoteResponseDto> {
    const result = await this._createQuoteCase.execute(data);

    return QuoteMapper.toDto(result);
  }
}
