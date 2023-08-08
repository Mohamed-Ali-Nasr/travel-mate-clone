import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { deleteReview, putReview } from "../controllers/review";

export default (router: Router) => {
  router.put("/review", authMiddleware, putReview);

  router.delete("/review", authMiddleware, deleteReview);
};
