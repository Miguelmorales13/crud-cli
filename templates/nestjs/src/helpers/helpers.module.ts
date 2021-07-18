import { Module } from "@nestjs/common";
import { LoggerService } from "./logger/logger.service";
import { EmailService } from "./email/email.service";

@Module({
	providers: [LoggerService, EmailService],
	exports: [LoggerService, EmailService]
})
export class HelpersModule {
}
