"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFile = exports.writeFile = exports.readFile = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var ncp_1 = __importDefault(require("ncp"));
var readFile = function (path) {
    console.log(path);
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(path, "utf8", function (err, content) {
            if (err)
                return reject(err);
            resolve(content);
        });
    });
};
exports.readFile = readFile;
var writeFile = function (path, content) {
    return new Promise(function (resolve, reject) {
        fs_1.default.writeFile(path, content, function (err) {
            if (err)
                return reject(err);
            resolve(true);
        });
    });
};
exports.writeFile = writeFile;
var copyFile = function (templateFile) {
    return new Promise(function (resolve, reject) {
        ncp_1.default(path_1.default.join("./templates/" + templateFile + "/"), path_1.default.join(process.cwd()), function (err) {
            if (err)
                return reject(err);
            resolve(true);
        });
    });
};
exports.copyFile = copyFile;
