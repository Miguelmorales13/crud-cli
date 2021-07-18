import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Request } from "express";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		// console.log("context", context);
		const req = context.switchToHttp().getRequest<Request>();
		return next.handle().pipe(
			map(async (data) => {
				let message = data.message ?? `petitions.${req.method}`;
				let dataFinal = data.data ?? data;
				return { data: dataFinal, message };
			}),
			catchError((err) => {
				console.log(err);
				return throwError(err);
			})
		);
	}
}
