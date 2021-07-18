import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { LoggerService } from "../helpers/logger/logger.service";
import { Request } from "express";

@Injectable()
export class RequestMiddleware implements NestMiddleware {
	constructor(private readonly loggerService: LoggerService) {
	}

	async use(req: Request, res: any, next: () => void) {
		req["uuid"] = uuid();
		req["time"] = Date.now();
		const log = await this.loggerService.formatLog(req, Date.now(), "REQUEST", req.body);
		Logger.log(log, "Entry");
		await this.loggerService.writeLogInFile(log);
		next();
	}
}
