import { httpStatusCodeToExceptionCode } from '@/shared/domain/constants/http-status-to-exception-code';
import { ExceptionCode } from '@/shared/domain/enums/exception-code';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainException } from 'src/shared/domain/exceptions/exception';
import { EnvService } from '../env/env.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  public constructor(private readonly _envService: EnvService) {}

  public catch(exception: unknown, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof DomainException) {
      return response.status(exception.statusCode).json({
        code: exception.code,
        statusCode: exception.statusCode,
        message: exception.message,
        errors: [],
      });
    }

    if (exception instanceof HttpException) {
      return this._handleHttpException(exception, response);
    }

    Logger.error(exception);

    return this._handleUnknownException(exception as Error, response);
  }

  private _handleUnknownException(
    exception: Error,
    response: Response,
  ): Response {
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: ExceptionCode.UNKNOWN,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'An unexpected error has occurred',
      errors: [],
      ...(this._envService.get('DEBUG') && {
        stack: exception?.stack ?? 'N/A',
      }),
    });
  }

  private _handleHttpException(
    exception: HttpException,
    response: Response,
  ): Response {
    if (exception.getStatus() === HttpStatus.UNPROCESSABLE_ENTITY) {
      return this._handleUnprocessableEntity(exception, response);
    }

    if (exception instanceof HttpException) {
      const code =
        httpStatusCodeToExceptionCode[exception.getStatus()] ??
        HttpStatus.INTERNAL_SERVER_ERROR;

      return response.status(exception.getStatus()).json({
        code,
        statusCode: exception.getStatus(),
        message: exception.message,
        errors: [],
        ...(this._envService.get('DEBUG') && {
          stack: exception?.stack ?? 'N/A',
        }),
      });
    }
  }

  private _handleUnprocessableEntity(
    exception: HttpException,
    _response: Response,
  ): Response {
    const response = exception.getResponse() as Record<string, unknown>;
    const errorMessages = Array.isArray(response.message)
      ? response.message
      : [response.message];

    const formattedErrors = errorMessages.map((message) => ({
      field: message.split(' ')[0],
      description: message.split(/\s+/).slice(1).join(' '),
    }));

    return _response.status(exception.getStatus()).json({
      code: ExceptionCode.VALIDATION_FAILED,
      statusCode: exception.getStatus(),
      message: 'Sorry, we could not process your request',
      errors: formattedErrors,
      ...(this._envService.get('DEBUG') && {
        stack: exception?.stack ?? 'N/A',
      }),
    });
  }
}
