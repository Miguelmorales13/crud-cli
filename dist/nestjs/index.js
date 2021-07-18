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
exports.IndexNestjs = void 0;
var write_files_1 = require("./write-files");
var global_questions_1 = require("../utils/global-questions");
var inquirer_1 = __importDefault(require("inquirer"));
var path_1 = __importDefault(require("path"));
var write_configuration_1 = require("./write-configuration");
var IndexNestjs = /** @class */ (function () {
    function IndexNestjs() {
        this.extras = [
            {
                name: "addAllConfiguration",
                type: "confirm",
                message: "Do you add validation pipe?",
                default: true
            },
        ];
    }
    IndexNestjs.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var responseInfo, relative, crudClass, pluralObject, singularObject, addAllConfiguration, fields, builder, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        console.log("info");
                        return [4 /*yield*/, global_questions_1.info(this.extras)];
                    case 1:
                        responseInfo = _a.sent();
                        relative = responseInfo.path, crudClass = responseInfo.crudClass, pluralObject = responseInfo.pluralObject, singularObject = responseInfo.singularObject, addAllConfiguration = responseInfo.addAllConfiguration;
                        console.log("paso extras");
                        if (!addAllConfiguration) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.executeConfiguration()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.generate()];
                    case 4:
                        fields = _a.sent();
                        builder = new write_files_1.WriteFiles(crudClass, path_1.default.join(process.cwd(), relative), pluralObject, singularObject, fields);
                        return [4 /*yield*/, builder.generateAll()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    IndexNestjs.prototype.executeConfiguration = function () {
        return __awaiter(this, void 0, void 0, function () {
            var configurations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        configurations = new write_configuration_1.WriteConfiguration();
                        return [4 /*yield*/, configurations.init()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexNestjs.prototype.generate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var other, fields, _a, _b, answers;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        other = true;
                        fields = [];
                        _c.label = 1;
                    case 1:
                        if (!other) return [3 /*break*/, 3];
                        _b = (_a = fields).push;
                        return [4 /*yield*/, this.generateQuestion()];
                    case 2:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 3;
                    case 3: return [4 /*yield*/, inquirer_1.default.prompt({
                            type: 'confirm',
                            name: 'name',
                            message: 'Do you want to add another field?',
                            default: true
                        })];
                    case 4:
                        answers = _c.sent();
                        other = answers.name;
                        _c.label = 5;
                    case 5:
                        if (other) return [3 /*break*/, 1];
                        _c.label = 6;
                    case 6: return [2 /*return*/, fields];
                }
            });
        });
    };
    IndexNestjs.prototype.generateQuestion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var questions;
            return __generator(this, function (_a) {
                questions = [
                    {
                        type: 'input',
                        name: 'field',
                        message: 'Field without spaces',
                        filter: function (val) {
                            return val.toLowerCase();
                        },
                        validate: function (value) {
                            return value.trim() != "";
                        }
                    },
                    {
                        type: 'list',
                        name: 'type',
                        message: 'Type field',
                        choices: ['number', 'string', 'boolean', 'Date',]
                    },
                    {
                        type: 'confirm',
                        name: 'required',
                        message: 'Is required?',
                        default: true
                    }
                ];
                return [2 /*return*/, inquirer_1.default.prompt(questions)];
            });
        });
    };
    return IndexNestjs;
}());
exports.IndexNestjs = IndexNestjs;
exports.default = {
    WriteFiles: write_files_1.WriteFiles
};
