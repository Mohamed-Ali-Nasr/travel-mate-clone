"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const place_1 = __importDefault(require("./place"));
const reservation_1 = __importDefault(require("./reservation"));
const review_1 = __importDefault(require("./review"));
const router = express_1.default.Router();
exports.default = () => {
    (0, auth_1.default)(router);
    (0, user_1.default)(router);
    (0, place_1.default)(router);
    (0, reservation_1.default)(router);
    (0, review_1.default)(router);
    return router;
};
