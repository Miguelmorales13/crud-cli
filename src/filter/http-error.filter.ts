import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { LoggerService } from '../helpers/logger/logger.service';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
	constructor(private readonly logService: LoggerService) {
	}

	catch(exception: HttpException, host: ArgumentsHost) {
		const { getRequest, getResponse } = host.switchToHttp();
		const request = getRequest<Request>();
		const response = getResponse<Response>();
		const status = exception.getStatus();
		const message = exception.message;
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
