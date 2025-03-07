import { HttpStatus } from '@nestjs/common';
import { ExceptionCode } from '../enums/exception-code';

export interface DomainExceptionResponse {
  httpCode: HttpStatus;
  code: ExceptionCode;
  message: string;
  timestamp: Date;
}

export abstract class DomainException extends Error {
  public readonly timestamp: Date;

  public constructor(
    message: string,
    public code: ExceptionCode,
    public statusCode: number,
  ) {
    super(message);

    this.name = this.constructor.name;
    this.timestamp = new Date();
    this.stack = this.stack?.split('\n').slice(1).join('\n') ?? 'N/A';

    Error.captureStackTrace(this);
    Object.setPrototypeOf(this, this.constructor.prototype);
  }

  public toResponse(): DomainExceptionResponse {
    return {
      httpCode: this.statusCode,
      code: this.code,
      message: this.message,
      timestamp: this.timestamp,
    };
  }
}
