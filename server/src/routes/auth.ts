import { Router } from "express";
import { authenticate, login, register } from "../controllers/auth";
import { authMiddleware } from "../middlewares/authMiddleware";

export default (router: Router) => {
  router.get("/auth", authMiddleware, authenticate);
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};
