"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteConfiguration = void 0;
var utils_1 = require("../utils");
var execa_1 = __importDefault(require("execa"));
var path_1 = __importDefault(require("path"));
var WriteConfiguration = /** @class */ (function () {
    function WriteConfiguration() {
        this.environments = [
            { name: 'PORT', type: 'number' },
            { name: 'HOST_FRONTEND', type: 'string' },
            { name: 'TOKEN_SECRET', type: 'string' },
            { name: 'EMAIL_TEST', type: 'string' },
            { name: 'HOST', type: 'string' },
            { name: 'MONGO_CONNECTION', type: 'string' },
            { name: 'SEQUELIZE_TYPE', type: 'string' },
            { name: 'SEQUELIZE_PORT', type: 'number' },
            { name: 'SEQUELIZE_HOST', type: 'string' },
            { name: 'SEQUELIZE_USERNAME', type: 'string' },
            { name: 'SEQUELIZE_PASSWORD', type: 'string' },
            { name: 'SEQUELIZE_DATABASE', type: 'string' },
            { name: 'EMAIL_HOST', type: 'string' },
            { name: 'NAME_APP', type: 'string' },
            { name: 'URL_LOG', type: 'string' },
            { name: 'WRITE_LOG', type: 'boolean' },
            { name: 'EMAIL_SECURE', type: 'string' },
            { name: 'EMAIL_USER', type: 'string' },
            { name: 'EMAIL_PASSWORD', type: 'string' },
            { name: 'EMAIL_SERVICE', type: 'string' },
            { name: 'EMAIL_PORT', type: 'number' },
            { name: 'LANG_DEFAULT', type: 'string' },
            { name: 'FILE_DEST', type: 'string' }
        ].map(function (_a) {
            var name = _a.name, type = _a.type;
            return "\n    @Is" + utils_1.capitalize(type) + "()\n    " + name + ": " + type + ";\n    ";
        });
    }
    WriteConfiguration.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.copyFile('nestjs')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.installDependencies()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.overwriteFiles()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WriteConfiguration.prototype.installDependencies = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, execa_1.default('yarn add ', ['@nestjs/swagger',
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
                        ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, execa_1.default('yarn add -D', [
                                '@types/uuid',
                                '@types/pug',
                                '@types/nodemailer',
                                '@types/multer',
                                '@types/i18n',
                            ])];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WriteConfiguration.prototype.overwriteFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contentModule;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.writeFile(path_1.default.join(process.cwd(), 'src', 'main.ts'), "\nimport { NestFactory } from \"@nestjs/core\";\nimport { AppModule } from \"./app.module\";\nimport { DocumentBuilder, SwaggerModule } from \"@nestjs/swagger\";\nimport { GetEnv } from \"./configs/env.validations\";\n\nasync function bootstrap() {\n  const app = await NestFactory.create(AppModule, { logger: true, cors: true });\n  const config = new DocumentBuilder()\n    .setTitle(\"App\")\n    .setDescription(\"description\")\n    .addBearerAuth()\n    .setVersion(\"1.0\")\n    .build();\n  const document = SwaggerModule.createDocument(app, { ...config });\n  SwaggerModule.setup(\"api\", app, document);\n  await app.listen(GetEnv(\"PORT\") || 3000);\n  console.log(\"is running in port \", GetEnv(\"PORT\") || 3000);\n}\n\nbootstrap();\n\n        ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, utils_1.readFile(path_1.default.join(process.cwd(), 'src', 'app.module.ts'))];
                    case 2:
                        contentModule = _a.sent();
                        contentModule = contentModule.replace(/imports: [],/g, "\n  imports: [\n    MulterModule.registerAsync({\n      useFactory: async () => ({\n        dest: join(__dirname, GetEnv(\"FILE_DEST\"))\n      })\n    }),\n    ServeStaticModule.forRoot({\n      rootPath: join(__dirname, \"..\", \"public\"),\n      exclude: []\n    }),\n    DatabasesModule,\n    HelpersModule,\n    ConfigModule.forRoot({ validate })\n  ],\n  ");
                        contentModule = contentModule.replace(/import { AppService } from '.\/app.service';/g, "\nimport { AppService } from \"./app.service\";\nimport { DatabasesModule } from \"./databases/databases.module\";\nimport { ConfigModule } from \"@nestjs/config\";\nimport { ServeStaticModule } from \"@nestjs/serve-static\";\nimport { MulterModule } from \"@nestjs/platform-express\";\nimport { GetEnv, validate } from \"./configs/env.validations\";\nimport { join } from \"path\";\nimport { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from \"@nestjs/core\";\nimport { ValidationPipe } from \"./pipes/validation.pipe\";\nimport { ResponseInterceptor } from \"./interceptors/response.interceptor\";\nimport { HttpErrorPayloadToLargeFilter } from \"./filter/http-error-payload-to-large.filter\";\nimport { HttpErrorFilter } from \"./filter/http-error.filter\";\nimport { HelpersModule } from \"./helpers/helpers.module\";\nimport { LoggerInterceptor } from \"./interceptors/logger.interceptor\";\n");
                        contentModule = contentModule.replace(/providers: \[AppService\]/g, "providers: [\n    AppService,\n    { provide: APP_FILTER, useClass: HttpErrorFilter }, \n    { provide: APP_FILTER, useClass: HttpErrorPayloadToLargeFilter }, \n    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },\n    { provide: APP_PIPE, useClass: ValidationPipe },\n    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }\n  ]");
                        return [4 /*yield*/, utils_1.writeFile(path_1.default.join(process.cwd(), 'src', 'app.module.ts'), contentModule)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return WriteConfiguration;
}());
exports.WriteConfiguration = WriteConfiguration;
