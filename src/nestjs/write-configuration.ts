import {capitalize, copyFile, readFile, writeFile} from "../utils";
import execa from "execa";
import path from "path";

export class WriteConfiguration {
    environments = [
        {name: 'PORT', type: 'number'},
        {name: 'HOST_FRONTEND', type: 'string'},
        {name: 'TOKEN_SECRET', type: 'string'},
        {name: 'EMAIL_TEST', type: 'string'},
        {name: 'HOST', type: 'string'},
        {name: 'MONGO_CONNECTION', type: 'string'},
        {name: 'SEQUELIZE_TYPE', type: 'string'},
        {name: 'SEQUELIZE_PORT', type: 'number'},
        {name: 'SEQUELIZE_HOST', type: 'string'},
        {name: 'SEQUELIZE_USERNAME', type: 'string'},
        {name: 'SEQUELIZE_PASSWORD', type: 'string'},
        {name: 'SEQUELIZE_DATABASE', type: 'string'},
        {name: 'EMAIL_HOST', type: 'string'},
        {name: 'NAME_APP', type: 'string'},
        {name: 'URL_LOG', type: 'string'},
        {name: 'WRITE_LOG', type: 'boolean'},
        {name: 'EMAIL_SECURE', type: 'string'},
        {name: 'EMAIL_USER', type: 'string'},
        {name: 'EMAIL_PASSWORD', type: 'string'},
        {name: 'EMAIL_SERVICE', type: 'string'},
        {name: 'EMAIL_PORT', type: 'number'},
        {name: 'LANG_DEFAULT', type: 'string'},
        {name: 'FILE_DEST', type: 'string'}
    ].map(({name, type}) => `
    @Is${capitalize(type)}()
    ${name}: ${type};
    `)

    async init() {
        await copyFile('nestjs')
        await this.installDependencies()
        await this.overwriteFiles()
    }

    async installDependencies() {
        await execa('yarn add ', ['@nestjs/swagger',
            '@nestjs/config',
            'class-transformer',
            'class-validator',
            'i18n',
            'joi',
            'moment',
            '@nestjs/serve-static',
            'multer',
            'nodemailer',
            'pg',
            'pg-hstore',
            'pug',
            'sequelize',
            'sequelize-typescript',
            'swagger-ui-express',
            'swagger-ui-themes',
            'uuid',
        ])
        await execa('yarn add -D', [
            '@types/uuid',
            '@types/pug',
            '@types/nodemailer',
            '@types/multer',
            '@types/i18n',
        ])
    }

    async overwriteFiles() {
        await writeFile(path.join(process.cwd(), 'src', 'main.ts'), `
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { GetEnv } from "./configs/env.validations";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: true, cors: true });
  const config = new DocumentBuilder()
    .setTitle("App")
    .setDescription("description")
    .addBearerAuth()
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, { ...config });
  SwaggerModule.setup("api", app, document);
  await app.listen(GetEnv("PORT") || 3000);
  console.log("is running in port ", GetEnv("PORT") || 3000);
}

bootstrap();

        `)
        let contentModule = await readFile(path.join(process.cwd(), 'src', 'app.module.ts'))
        contentModule = contentModule.replace(/imports: [],/g, `
  imports: [
    MulterModule.registerAsync({
      useFactory: async () => ({
        dest: join(__dirname, GetEnv("FILE_DEST"))
      })
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      exclude: []
    }),
    DatabasesModule,
    HelpersModule,
    ConfigModule.forRoot({ validate })
  ],
  `)
        contentModule = contentModule.replace(/import { AppService } from '.\/app.service';/g, `
import { AppService } from "./app.service";
import { DatabasesModule } from "./databases/databases.module";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { MulterModule } from "@nestjs/platform-express";
import { GetEnv, validate } from "./configs/env.validations";
import { join } from "path";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ValidationPipe } from "./pipes/validation.pipe";
import { ResponseInterceptor } from "./interceptors/response.interceptor";
import { HttpErrorPayloadToLargeFilter } from "./filter/http-error-payload-to-large.filter";
import { HttpErrorFilter } from "./filter/http-error.filter";
import { HelpersModule } from "./helpers/helpers.module";
import { LoggerInterceptor } from "./interceptors/logger.interceptor";
`)
        contentModule = contentModule.replace(/providers: \[AppService\]/g, `providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpErrorFilter }, 
    { provide: APP_FILTER, useClass: HttpErrorPayloadToLargeFilter }, 
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }
  ]`)
        await writeFile(path.join(process.cwd(), 'src', 'app.module.ts'), contentModule)

    }
}