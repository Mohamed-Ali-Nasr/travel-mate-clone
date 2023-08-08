"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = require("../middlewares/authMiddleware");
const review_1 = require("../controllers/review");
exports.default = (router) => {
    router.put("/review", authMiddleware_1.authMiddleware, review_1.putReview);
    router.delete("/review", authMiddleware_1.authMiddleware, review_1.deleteReview);
};
