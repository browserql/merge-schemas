"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.sanitizeSchema = void 0;
var graphql_1 = require("graphql");
var extendError = /There can be only one type named "(.+)"\./;
function sanitizeSchema(source, iterations, limit) {
    if (iterations === void 0) { iterations = 0; }
    if (limit === void 0) { limit = 1000; }
    try {
        (0, graphql_1.buildSchema)(source);
        return source;
    }
    catch (error) {
        if (iterations > limit) {
            throw new Error("Maximum loop: " + source);
        }
        if (error instanceof Error) {
            if (extendError.test(error.message)) {
                var type_1 = error.message.replace(extendError, '$1');
                var _a = (0, graphql_1.parse)(source), definitions = _a.definitions, doc = __rest(_a, ["definitions"]);
                var found_1 = false;
                var nextDefs = definitions.map(function (def) {
                    if (def.kind === 'ObjectTypeDefinition' && def.name.value === type_1) {
                        if (!found_1) {
                            found_1 = true;
                        }
                        else {
                            return __assign(__assign({}, def), { kind: 'ObjectTypeExtension' });
                        }
                    }
                    return def;
                });
                return sanitizeSchema((0, graphql_1.print)(__assign(__assign({}, doc), { definitions: nextDefs })), iterations++);
            }
        }
        throw error;
    }
}
exports.sanitizeSchema = sanitizeSchema;
