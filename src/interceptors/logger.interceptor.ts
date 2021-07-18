import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoggerService } from "../helpers/logger/logger.service";
import { Request } from "express";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
	constructor(private readonly loggerService: LoggerService) {
	}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const req = context.switchToHttp().getRequest<Request>();
		const module = `${context.getClass().name}::${context.getHandler().name}`;

		return next.handle().pipe(
			map(
				async (data) => {
					const log = await this.loggerService.formatLog(req, Date.now(), "RESPONSE", await data);
					Logger.log(log, module);
					await this.loggerService.writeLogInFile(log);
					return await data;
				}
			)
		);
	}
}
