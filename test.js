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
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var source;
        return __generator(this, function (_a) {
            source = "\n  type Query {\n    \"\"\"Compose the payload that will be encoded into a JSON Web Token\"\"\"\n    compose_jwt_payload(variables: ComposeJwtPayloadVariables!): JWTPayload! @command(label: \"Compose JSON Web Token payload\")\n  }\n  \n  input ComposeJwtPayloadVariables {\n    userID: MySQLID!\n    role: UserType!\n    staffID: MySQLID\n    doctorID: MySQLID\n    patientID: MySQLID\n  }\n  \n  scalar Date\n  \n  scalar JSON\n  \n  type JWTPayload {\n    id: MySQLID!\n    exp: Int!\n    alg: String!\n    iss: String!\n    aud: UserType!\n    sid: MySQLID\n    pid: MySQLID\n    did: MySQLID\n  }\n  \n  scalar MySQLID\n  \n  type Mutation {\n    runHandler(handler: HandlerInput): HandlerResult!\n  }\n  \n  directive @command(isGroup: Boolean, label: String) on FIELD_DEFINITION\n  \n  type Handler {\n    I: String!\n  }\n  \n  input HandlerInput {\n    label: String!\n    I: String!\n  }\n  \n  type HandlerResult {\n    startedAt: Date!\n    endedAt: Date!\n  }\n  \n  enum UserType {\n    leadPsychiatrist\n  }\n  \n  type Query {\n    start(userType: UserType!): JSON!\n  }\n  \n  type Query {\n    ping: Pong\n  }\n  \n  scalar Pong\n  ";
            console.log((0, _1.sanitizeSchema)(source));
            return [2 /*return*/];
        });
    });
}
run();
