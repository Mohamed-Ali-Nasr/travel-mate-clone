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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../schemas/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const dtoUtils_1 = require("../utils/dtoUtils");
const config_1 = require("../config");
const http_errors_1 = __importDefault(require("http-errors"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, dateOfBirth, email, password } = req.body;
    try {
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            throw (0, http_errors_1.default)(400, "User already exists. Please choose a different one or log in instead.");
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const newUser = new User_1.default({
            firstName: name,
            email,
            phone,
            dateOfBirth,
            role: "user",
            password: hashedPassword,
        });
        yield newUser.save();
        res.status(201).json({ message: "User created." });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email })
            .select("+password +email")
            .exec();
        if (!user) {
            throw (0, http_errors_1.default)(400, "Invalid email or password.");
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw (0, http_errors_1.default)(400, "Invalid email or password.");
        }
        const payload = {
            id: user._id,
        };
        const token = (0, jsonwebtoken_1.sign)(payload, config_1.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.status(200).json({ token, user: (0, dtoUtils_1.getUserDTO)(user) });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const user = yield User_1.default.findById(userId);
        if (!user) {
            throw (0, http_errors_1.default)(404, "User not found.");
        }
        res.status(200).json(Object.assign(Object.assign({}, (0, dtoUtils_1.getUserDTO)(user)), { email: user.email }));
    }
    catch (error) {
        next(error);
    }
});
exports.authenticate = authenticate;
