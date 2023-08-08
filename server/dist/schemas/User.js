"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    profileImage: String,
    phone: { type: String, required: true },
    address: String,
    dateOfBirth: { type: Date, required: true },
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
