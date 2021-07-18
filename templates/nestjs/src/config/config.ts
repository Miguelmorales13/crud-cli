import { plainToClass } from "class-transformer";
import { Environments } from "./environments";
import { validateSync } from "class-validator";
import { v4 } from "uuid";
import { diskStorage } from "multer";
import { extname } from "path";

export enum EnumUploads {
	images = "images",
	pdfs = "pdfs",
	xlsx = "xlsx",
	sdks = "sdks",
}

export function validate(config: Record<string, any>) {
	const validateConfig = plainToClass(Environments, config, {
		enableImplicitConversion: true
	});
	const errors = validateSync(validateConfig, { skipMissingProperties: false });
	if (errors.length > 0) {
		throw new Error(errors.toString());
	}
	return validateConfig;
}

export function GetEnv(name: keyof Environments) {
	return process.env[name];
}

export const generateStorageMulter = (
	type: EnumUploads = EnumUploads.images,
	maxSize: number = 3
) => ({
	storage: diskStorage({
		destination: `./public/uploads/${type}`,
		filename: (req, file, cb) => {
			return cb(null, `${v4()}${extname(file.originalname)}`);
		}
	}),
	limits: {
		fileSize: maxSize * 1024 * 1024
	}
});
