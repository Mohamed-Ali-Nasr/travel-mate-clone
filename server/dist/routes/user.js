"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controllers/user");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const fileMiddleware_1 = require("../middlewares/fileMiddleware");
const place_1 = require("../controllers/place");
exports.default = (router) => {
    router.post("/user/profile", authMiddleware_1.authMiddleware, fileMiddleware_1.upload.single("image"), user_1.updateProfile);
    router.post("/user/business", authMiddleware_1.authMiddleware, fileMiddleware_1.upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "images", maxCount: 10 },
    ]), place_1.createPlace);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.use((err, req, res, next) => {
        console.log("This is the invalid field ->", err.field);
        next(err);
    });
};
