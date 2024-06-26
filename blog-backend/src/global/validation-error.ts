import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  async catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errors = exceptionResponse['message'];

    response.status(status).json({
			status,
			message: errors,
			responseId: uuidv4()
    });

  }
}
