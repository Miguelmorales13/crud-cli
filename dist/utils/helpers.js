"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importsNextValidations = exports.ValidationsNestJs = exports.capitalize = void 0;
var capitalize = function (value) {
    return "" + value.slice(0, 1).toUpperCase() + value.slice(1, value.length);
};
exports.capitalize = capitalize;
exports.ValidationsNestJs = {
    'string': '@IsString()',
    'number': '@IsNumber()',
    'Date': '@IsDate()',
    'boolean': '@IsBoolean()'
};
var importsNextValidations = function (fields) {
    var newFields = fields.filter(function (field) { return field.required; });
    var typos = ['number', 'string', 'boolean', 'Date'].filter(function (type) { return newFields.find(function (field) { return field.field == type; }); });
    // @ts-ignore
    return "import { " + typos.map(function (typo) { return exports.ValidationsNestJs[typo]; }).join(",") + " from 'class-validator'";
};
exports.importsNextValidations = importsNextValidations;
