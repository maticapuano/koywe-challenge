import { InvalidArgumentException } from '@/shared/domain/exceptions/invalid-argument';
import { ParseUUIDPipe as BaseParseUUIDPipe } from '@nestjs/common';

interface ParseUUIDPipeOptions {
  optional?: boolean;
  message?: string;
}

export class ParseUUIDPipe extends BaseParseUUIDPipe {
  public constructor(options: ParseUUIDPipeOptions = {}) {
    super({
      exceptionFactory: () =>
        new InvalidArgumentException(options.message || 'Invalid UUID'),
      optional: options.optional,
    });
  }
}
