import { Router } from "express";
import { updateProfile } from "../controllers/user";
import { authMiddleware } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/fileMiddleware";
import { createPlace } from "../controllers/place";

export default (router: Router) => {
  router.post(
    "/user/profile",
    authMiddleware,
    upload.single("image"),
    updateProfile
  );

  router.post(
    "/user/business",
    authMiddleware,
    upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    createPlace
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  router.use((err: any, req: any, res: any, next: any) => {
    console.log("This is the invalid field ->", err.field);
    next(err);
  });
};
