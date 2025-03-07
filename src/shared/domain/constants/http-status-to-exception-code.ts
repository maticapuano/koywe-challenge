import { HttpStatus } from '@nestjs/common';
import { ExceptionCode } from '../enums/exception-code';

export const httpStatusCodeToExceptionCode: Record<number, ExceptionCode> = {
  [HttpStatus.BAD_REQUEST]: ExceptionCode.BAD_REQUEST,
  [HttpStatus.UNAUTHORIZED]: ExceptionCode.UNAUTHORIZED,
  [HttpStatus.FORBIDDEN]: ExceptionCode.FORBIDDEN,
  [HttpStatus.NOT_FOUND]: ExceptionCode.NOT_FOUND,
  [HttpStatus.CONFLICT]: ExceptionCode.CONFLICT,
  [HttpStatus.UNPROCESSABLE_ENTITY]: ExceptionCode.VALIDATION_FAILED,
  [HttpStatus.INTERNAL_SERVER_ERROR]: ExceptionCode.UNKNOWN,
};
