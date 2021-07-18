import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator";

export enum enumEnvironment {
	Development = "development",
	Production = "production",
	Test = "test",
	Provision = "provision",
}

export class Environments {
	@IsEnum(enumEnvironment)
	NODE_ENV: enumEnvironment;

	@IsNumber()
	PORT: number;

	@IsString()
	HOST_FRONTEND: string;

	@IsString()
	TOKEN_SECRET: string;

	@IsString()
	EMAIL_TEST: string;

	@IsString()
	HOST: string;

	@IsString()
	MONGO_CONNECTION: string;

	@IsString()
	SEQUELIZE_TYPE: string;

	@IsNumber()
	SEQUELIZE_PORT: number;

	@IsString()
	SEQUELIZE_HOST: string;

	@IsString()
	SEQUELIZE_USERNAME: string;

	@IsString()
	SEQUELIZE_PASSWORD: string;

	@IsString()
	SEQUELIZE_DATABASE: string;

	@IsString()
	EMAIL_HOST: string;

	@IsString()
	NAME_APP: string;

	@IsString()
	URL_LOG: string;

	@IsBoolean()
	WRITE_LOG: boolean;

	@IsString()
	EMAIL_SECURE: string;

	@IsString()
	EMAIL_USER: string;

	@IsString()
	EMAIL_PASSWORD: string;

	@IsString()
	EMAIL_SERVICE: string;

	@IsNumber()
	EMAIL_PORT: number;

	@IsString()
	LANG_DEFAULT: string;

	@IsString()
	FILE_DEST: string;
}
