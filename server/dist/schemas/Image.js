"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
    name: String,
    img: {
        data: Buffer,
        contentType: String,
    },
});
exports.default = (0, mongoose_1.model)("Image", imageSchema);
