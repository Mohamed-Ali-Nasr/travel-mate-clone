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
exports.imageDelete = exports.imageSave = void 0;
const Image_1 = __importDefault(require("../schemas/Image"));
const imageSave = (image) => __awaiter(void 0, void 0, void 0, function* () {
    const name = Date.now() + image.originalname;
    const newImage = new Image_1.default({
        name,
        img: {
            data: image.buffer,
            contentType: image.mimetype,
        },
    });
    yield newImage.save();
    return name;
});
exports.imageSave = imageSave;
const imageDelete = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const image = yield Image_1.default.findOne({ name });
    if (!image) {
        return;
    }
    yield image.deleteOne();
});
exports.imageDelete = imageDelete;
