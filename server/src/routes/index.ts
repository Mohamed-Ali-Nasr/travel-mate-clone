import express, { Router } from "express";
import auth from "./auth";
import user from "./user";
import place from "./place";
import reservation from "./reservation";
import review from "./review";

const router = express.Router();

export default (): Router => {
  auth(router);
  user(router);
  place(router);
  reservation(router);
  review(router);
  return router;
};
