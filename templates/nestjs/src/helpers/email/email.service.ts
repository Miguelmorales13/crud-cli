import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GetEnv } from "../../config/config";
import { createTestAccount, createTransport, Transporter } from "nodemailer";
import { join } from "path";
import { renderFile } from "pug";
import { IEmailSubscription } from "./models/IEmailSubscription";
import { IEmailVerification } from "./models/IEmailVerification";
import { IEmailRecoveryPassword } from "./models/IEmailRecoveryPassword";

@Injectable()
export class EmailService {
	private transporter: Transporter;

	constructor() {
		let user: any = GetEnv("EMAIL_TEST") == "true"
			? createTestAccount()
			: {
				user: GetEnv("EMAIL_USER"),
				pass: GetEnv("EMAIL_PASSWORD")
			};
		console.log({
			// @ts-ignore
			port: parseInt(GetEnv("EMAIL_PORT")),
			host: GetEnv("EMAIL_HOST"),
			secure: GetEnv("EMAIL_SECURE") == "true",
			auth: { ...user }
		});
		this.transporter = createTransport({
			host: GetEnv("EMAIL_HOST"),
			auth: { ...user }
		});
	}


	private async sendMail(to: string, subject: string, html: string): Promise<Transporter> {
		return await this.transporter.sendMail({ from: GetEnv("EMAIL_USER"), to, subject, text: "text", html });
	}

	private async generateTemplate<T>(template: string, object: T): Promise<string> {
		if (GetEnv("NODE_ENV") == "development") {
			console.log("render", GetEnv("NODE_ENV"));
			return renderFile(join(__dirname, `../../../src/helpers/email/templates/${template}.email.pug`), { ...object });
		} else {
			return renderFile(join(__dirname, `/templates/${template}.email.pug`), { ...object });
		}
	}

	async sendSubscription(to: string, object: IEmailSubscription) {
		try {
			const template = await this.generateTemplate<IEmailSubscription>("subscription", object);
			await this.sendMail(to, "Registro exitoso en la plataofrma 'Restaurantix' ", template);
		} catch (error) {
			console.log(error);
			throw new HttpException("errors.users.user_not_created_email", HttpStatus.FAILED_DEPENDENCY);
		}
	}

	async sendVerificationEmail(to: string, object: IEmailVerification) {
		try {
			const template = await this.generateTemplate<IEmailVerification>("verification", object);
			await this.sendMail(to, "Verificacion de correo en la plataforma 'Restaurantix' ", template);
		} catch (e) {
			console.log("Email", e);
			throw new HttpException("errors.users.user_not_created_email", HttpStatus.FAILED_DEPENDENCY);
		}
	}

	async sendRecoveryPassword(to: string, object: IEmailRecoveryPassword) {
		try {
			const template = await this.generateTemplate<IEmailRecoveryPassword>("recovery-password", object);
			await this.sendMail(to, "Recuperacion de contrasenia en 'Restaurantix' ", template);
		} catch (e) {
			console.log("Email", e);
			throw new HttpException("errors.users.user_not_created_email", HttpStatus.FAILED_DEPENDENCY);
		}
	}
}
