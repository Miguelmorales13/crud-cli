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
exports.WriteFiles = void 0;
var utils_1 = require("../utils");
var path_1 = __importDefault(require("path"));
var WriteFiles = /** @class */ (function () {
    function WriteFiles(className, path, plural, singular, fields) {
        this.className = className;
        this.path = path;
        this.plural = plural;
        this.singular = singular;
        this.fields = fields;
    }
    WriteFiles.prototype.generateAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.writeProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.writeService()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.writeEntity()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.writeCreateDto()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.writeUpdateDto()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.writeModule()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WriteFiles.prototype.writeProvider = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.writeFile(path_1.default.join(this.path, this.plural + ".provider.ts"), "\nimport { " + utils_1.capitalize(this.singular) + " } from './entities/" + this.singular + ".entity';\n\nexport const " + this.plural + "Providers = [\n    {\n        provide: '" + this.plural.toUpperCase() + "_PROVIDER',\n        useValue: " + utils_1.capitalize(this.singular) + ",\n    },\n];\n        ")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WriteFiles.prototype.writeCreateDto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fieldsGenerated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fieldsGenerated = this.fields.map(function (_a) {
                            var type = _a.type, field = _a.field;
                            return "\n    " + utils_1.ValidationsNestJs[type] + "\n    @ApiProperty()\n    @Expose() " + field + "?: " + type + ";";
                        }).join("");
                        return [4 /*yield*/, utils_1.writeFile(path_1.default.join(this.path, 'dto', "create-" + this.singular + ".dto.ts"), "\nimport { Expose } from 'class-transformer';\nimport { Create" + utils_1.capitalize(this.singular) + "Dto } from './create-" + this.singular + ".dto';\n" + utils_1.importsNextValidations(this.fields) + "\nimport { ApiProperty } from '@nestjs/swagger';\n\nexport class Create" + utils_1.capitalize(this.singular) + "Dto  {\n    " + fieldsGenerated + "\n}\n        ")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WriteFiles.prototype.writeEntity = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fieldsGenerated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fieldsGenerated = this.fields.map(function (field) {
                            return "\n    @Column" + (field.required ? '({allowNull:false})' : '') + "\n    " + field.field + "?: " + field.type + ";";
                        }).join("");
                        return [4 /*yield*/, utils_1.writeFile(path_1.default.join(this.path, 'entities', this.singular + ".entity.ts"), "\nimport { Column, Table } from 'sequelize-typescript';\nimport { Base } from '../../../databases/entities/base';\n\n@Table({\n  underscored: true,\n  paranoid: true,\n  timestamps: true,\n})\n\nexport class " + utils_1.capitalize(this.singular) + " extends Base<" + utils_1.capitalize(this.singular) + "> {\n  " + fieldsGenerated + "\n}\n")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WriteFiles.prototype.writeModule = function () {
        return __awaiter(this, void 0, void 0, function () {
            var content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.readFile(path_1.default.join(this.path, this.plural + ".module.ts"))];
                    case 1:
                        content = _a.sent();
                        content = content.replace(/.controller';/g, ".controller';\nimport { " + this.plural + "Providers } from './" + this.plural + ".provider';");
                        content = content.replace(/Service\]/g, "Service,..." + this.plural + "Providers]");
                        return [4 /*yield*/, utils_1.writeFile(path_1.default.join(this.path, this.plural + ".module.ts"), content)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WriteFiles.prototype.writeService = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.writeFile(path_1.default.join(this.path, this.plural + ".service.ts"), "\nimport { Inject, Injectable } from '@nestjs/common';\nimport { Create" + utils_1.capitalize(this.singular) + "Dto } from './dto/create-" + this.singular + ".dto';\nimport { Update" + utils_1.capitalize(this.singular) + "Dto } from './dto/update-" + this.singular + ".dto';\nimport { " + this.className + " } from '../crud/" + this.className + "';\nimport { " + utils_1.capitalize(this.singular) + " } from './entities/" + this.singular + ".entity';\n\n@Injectable()\nexport class " + utils_1.capitalize(this.plural) + "Service extends " + this.className + "<\n  " + utils_1.capitalize(this.singular) + ",\n  Create" + utils_1.capitalize(this.singular) + "Dto,\n  Update" + utils_1.capitalize(this.singular) + "Dto\n> {\n  constructor(\n    @Inject('" + this.plural.toUpperCase() + "_PROVIDER') private readonly " + this.plural + ": typeof " + utils_1.capitalize(this.singular) + ",\n  ) {\n    super(" + this.plural + ");\n  }\n}\n")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WriteFiles.prototype.writeUpdateDto = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.writeFile(path_1.default.join(this.path, 'dto', "update-" + this.singular + ".dto.ts"), "\nimport { Create" + utils_1.capitalize(this.singular) + "Dto } from './create-" + this.singular + ".dto';\nimport { IsNumber } from 'class-validator';\nimport { ApiProperty } from '@nestjs/swagger';\nimport { Expose } from 'class-transformer';\n\nexport class Update" + utils_1.capitalize(this.singular) + "Dto extends Create" + utils_1.capitalize(this.singular) + "Dto {\n    @IsNumber()\n    @ApiProperty()\n    id?: number;\n    createdAt?: string;\n    updatedAt?: string;\n}\n        ")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return WriteFiles;
}());
exports.WriteFiles = WriteFiles;
