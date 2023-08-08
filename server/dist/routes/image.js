"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_1 = require("../controllers/image");
const imageRouter = express_1.default.Router();
imageRouter.get("/:imageName", image_1.getImage);
exports.default = imageRouter;
