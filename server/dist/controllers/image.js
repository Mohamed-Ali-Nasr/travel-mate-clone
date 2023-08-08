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
exports.getImage = exports.uploadImage = void 0;
const Image_1 = __importDefault(require("../schemas/Image"));
const http_errors_1 = __importDefault(require("http-errors"));
const uploadImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { file } = req;
        if (!file) {
            throw (0, http_errors_1.default)(400, "No file uploaded.");
        }
        const newImage = new Image_1.default({
            name: Date.now() + file.originalname,
            img: {
                data: file.buffer,
                contentType: file.mimetype,
            },
        });
        yield newImage.save();
        res.status(201).json({ message: "Image uploaded.", newImage });
    }
    catch (error) {
        next(error);
    }
});
exports.uploadImage = uploadImage;
const getImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { imageName } = req.params;
    if (!imageName) {
        throw (0, http_errors_1.default)(400, "No image requested.");
    }
    try {
        const image = yield Image_1.default.findOne({ name: imageName });
        if (!image) {
            throw (0, http_errors_1.default)(400, "Image not found.");
        }
        res.set("Content-Type", image.img.contentType.toString());
        res.status(200).send(Buffer.from(image.img.data.buffer));
    }
    catch (error) {
        next(error);
    }
});
exports.getImage = getImage;
