import { Injectable } from "@nestjs/common";
import * as moment from "moment";
import * as path from "path";
import { GetEnv } from "../../config/config";
import * as fs from "fs";

export type TypeLogger = "REQUEST" | "RESPONSE" | "ERROR" | "SERVICE";

@Injectable()
export class LoggerService {
	formatLog({ method, url, uuid }: Request | any, now: number, type: TypeLogger, object: Object) {
		let date = moment().format("DD-MM-YYYY HH:MM:SS");
		let timeResponse = Date.now() - now;
		let log = `[${date}] [uuid:${uuid}][${method} ${url} ${timeResponse}ms ] [${type}:${JSON.stringify(object)}] `;
		return log;
	}


	writeLogInFile(log: string) {
		if (!Boolean(GetEnv("WRITE_LOG"))) {
			return;
		}
		let date = moment().format("DD-MM-YYYY");
		const url = path.join(__dirname, "../../../", GetEnv("URL_LOG"), `${date}-${GetEnv("NAME_APP")}.log`);
		fs.appendFile(
			url,
			log + "\n",
			(error) => {
				if (error) {
					return false;
				}
				console.error(error);
				return true;
			}
		);

	}
}
