"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controllers/auth");
const authMiddleware_1 = require("../middlewares/authMiddleware");
exports.default = (router) => {
    router.get("/auth", authMiddleware_1.authMiddleware, auth_1.authenticate);
    router.post("/auth/register", auth_1.register);
    router.post("/auth/login", auth_1.login);
};
