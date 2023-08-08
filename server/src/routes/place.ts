import { Router } from "express";
import {
  addMenuItemToPlace,
  addServiceToPlace,
  deleteMenuItemFromPlace,
  deletePlace,
  deleteServiceFromPlace,
  getPlace,
  searchPlaces,
  updatePlace,
} from "../controllers/place";
import { authMiddleware } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/fileMiddleware";

export default (router: Router) => {
  router.get("/place/search", searchPlaces);

  router.get("/place/:placeId", getPlace);

  router.put(
    "/place/:placeId",
    authMiddleware,
    upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    updatePlace
  );

  router.delete("/place/:placeId", authMiddleware, deletePlace);

  router.post(
    "/place/:placeId/service",
    authMiddleware,
    upload.single("image"),
    addServiceToPlace
  );

  router.post(
    "/place/:placeId/menu",
    authMiddleware,
    upload.single("image"),
    addMenuItemToPlace
  );

  router.delete(
    "/place/:placeId/service/:serviceId",
    authMiddleware,
    deleteServiceFromPlace
  );

  router.delete(
    "/place/:placeId/menu/:menuId",
    authMiddleware,
    deleteMenuItemFromPlace
  );
};
