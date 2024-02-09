import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from '@libs/logger';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private HAS_DEFAULT_MESSAGE = [
    HttpStatus.UNAUTHORIZED,
    HttpStatus.FORBIDDEN,
    HttpStatus.TOO_MANY_REQUESTS,
    HttpStatus.INTERNAL_SERVER_ERROR,
  ];

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly loggerService: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    this.loggerService.error({
      stack: (exception as any).stack,
      message: `ERROR | ${ctx.getResponse<Request>().method} | ${
        ctx.getResponse<Request>().url
      }`,
    });

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const data =
      exception instanceof HttpException
        ? exception.getResponse()['data']
        : null;

    const message = this.formatCustomMessage(exception);
    httpAdapter.reply(ctx.getResponse(), { message, data }, httpStatus);
  }

  private getDefaultMessage(httpStatus: number): string[] {
    if (httpStatus === HttpStatus.UNAUTHORIZED) return ['UNAUTHORIZED'];
    if (httpStatus === HttpStatus.FORBIDDEN) return ['FORBIDDEN'];
    if (httpStatus === HttpStatus.TOO_MANY_REQUESTS)
      return ['TOO_MANY_REQUESTS'];
    if (httpStatus === HttpStatus.CONFLICT) return ['CONFLICT'];
    if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR)
      return ['INTERNAL_SERVER_ERROR'];
  }

  private formatCustomMessage(exception: unknown): string[] {
    if (exception instanceof HttpException) {
      if (Array.isArray(exception.getResponse()['message']))
        return exception.getResponse()['message'];
      return [exception.getResponse()['message'] || exception.getResponse()];
    } else {
      return this.getDefaultMessage(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
