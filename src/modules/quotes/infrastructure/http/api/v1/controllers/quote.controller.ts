import { CreateQuoteCase } from '@/modules/quotes/application/use-cases/create-quote.case';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateQuoteDto,
  CreateQuoteResponseDto,
} from '../dtos/create-quote.dto';
import { CreateQuoteMapper } from '../mappers/create-quote.mapper';

@Controller({
  path: '/quotes',
  version: '1',
})
@ApiTags('Quotes')
export class QuoteController {
  public constructor(private readonly _createQuoteCase: CreateQuoteCase) {}

  @Post('/')
  @ApiCreatedResponse({
    description: 'Quote created',
    type: CreateQuoteResponseDto,
  })
  @ApiOperation({ summary: 'Create quote ' })
  @ApiUnauthorizedResponse({ description: 'Invalid access token' })
  @ApiBearerAuth()
  public async create(
    @Body() data: CreateQuoteDto,
  ): Promise<CreateQuoteResponseDto> {
    const result = await this._createQuoteCase.execute(data);

    return CreateQuoteMapper.toDto(result);
  }
}
