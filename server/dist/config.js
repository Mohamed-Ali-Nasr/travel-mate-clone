"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
require("dotenv/config");
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
if (!validateEnv_1.default.JWT_SECRET) {
    console.error("JWT_SECRET is not defined. Using development JWT_SECRET!");
}
const JWT_SECRET = (_a = validateEnv_1.default.JWT_SECRET) !== null && _a !== void 0 ? _a : "Ab98LK67JKlk98hGtYHg5TGFy78TgfD234WSDfGh56UjkL0976TFdS34EDrTgh";
exports.JWT_SECRET = JWT_SECRET;
