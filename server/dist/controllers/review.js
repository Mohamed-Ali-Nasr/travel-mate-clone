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
exports.deleteReview = exports.putReview = void 0;
const Place_1 = __importDefault(require("../schemas/Place"));
const User_1 = __importDefault(require("../schemas/User"));
const http_errors_1 = __importDefault(require("http-errors"));
const putReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { rating, comment, placeId } = req.body;
    if (!placeId || !userId || !rating) {
        throw (0, http_errors_1.default)(400, "Invalid data.");
    }
    try {
        const place = yield Place_1.default.findById(placeId).populate("reviews.user");
        if (!place) {
            throw (0, http_errors_1.default)(404, "Place not found.");
        }
        const user = yield User_1.default.findById(userId);
        if (!user) {
            throw (0, http_errors_1.default)(404, "User not found.");
        }
        const newReview = {
            _id: undefined,
            user: userId,
            rating: rating,
            comment: comment,
        };
        const review = yield Place_1.default.findOne({ "reviews.user": userId });
        if (review) {
            place.reviews = place.reviews.filter((item) => {
                const user = item.user;
                return user._id.toString() !== userId.toString();
            });
            place.reviews.push(newReview);
        }
        else {
            place.reviews.push(newReview);
        }
        yield place.save();
        res.status(201).json({ message: "Review created." });
    }
    catch (error) {
        next(error);
    }
});
exports.putReview = putReview;
const deleteReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { placeId } = req.body;
    if (!placeId || !userId) {
        throw (0, http_errors_1.default)(400, "Invalid data.");
    }
    try {
        const place = yield Place_1.default.findById(placeId).populate("reviews.user");
        if (!place) {
            throw (0, http_errors_1.default)(404, "Place not found.");
        }
        place.reviews = place.reviews.filter((item) => {
            const user = item.user;
            return user._id.toString() !== userId.toString();
        });
        yield place.save();
        res.status(200).json({ message: "Review deleted." });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteReview = deleteReview;
