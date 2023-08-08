"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const http_errors_1 = __importDefault(require("http-errors"));
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET, (error, decode) => {
            if (error) {
                return res.status(404).json({
                    message: error,
                    error,
                });
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                req.userId = decode.id;
                if (!req.userId) {
                    throw (0, http_errors_1.default)(401, "Invalid token.");
                }
                next();
            }
        });
    }
    else {
        next((0, http_errors_1.default)(401, "User not authenticated"));
    }
};
exports.authMiddleware = authMiddleware;
