import { ArgumentsHost, Catch, ExceptionFilter, Logger, PayloadTooLargeException } from '@nestjs/common';
import { LoggerService } from '../helpers/logger/logger.service';
import { Request, Response } from 'express';

@Catch(PayloadTooLargeException)
export class HttpErrorPayloadToLargeFilter implements ExceptionFilter {
	constructor(private readonly logService: LoggerService) {
	}

	catch(exception: PayloadTooLargeException, host: ArgumentsHost) {
		const { getRequest, getResponse } = host.switchToHttp();
		const request = getRequest<Request>();
		const response = getResponse<Response>();
		const status = exception.getStatus();
		// @ts-ignore
		const message = 'errors.payload_to_large';
		const errorResponse = {
			code: status,
			path: request.url,
			timestamp: new Date().toLocaleDateString(),
			method: request.method,
			message,
		};
		const log = this.logService.formatLog(
			request,
			Date.now(),
			'ERROR',
			errorResponse,
		);
		Logger.error(exception);
		Logger.log(log, '');
		response.status(status).json(errorResponse);
	}
}
