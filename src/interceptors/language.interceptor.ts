import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as i18n from "i18n";

@Injectable()
export class LanguageInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const req = context.switchToHttp().getRequest<Request>();
		const lang: any = req.headers["accept-language"] || process.env.LANG_DEFAULT;
		return next.handle().pipe(
			map(async (data) => {
				const { message, data: response } = await data;
				const messageLanguage = i18n.__({
					locale: lang,
					phrase: message
				}, message);
				return {
					data: response,
					message: messageLanguage
				};
			})
		);
	}
}
