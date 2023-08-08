"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const place_1 = require("../controllers/place");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const fileMiddleware_1 = require("../middlewares/fileMiddleware");
exports.default = (router) => {
    router.get("/place/search", place_1.searchPlaces);
    router.get("/place/:placeId", place_1.getPlace);
    router.put("/place/:placeId", authMiddleware_1.authMiddleware, fileMiddleware_1.upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "images", maxCount: 10 },
    ]), place_1.updatePlace);
    router.delete("/place/:placeId", authMiddleware_1.authMiddleware, place_1.deletePlace);
    router.post("/place/:placeId/service", authMiddleware_1.authMiddleware, fileMiddleware_1.upload.single("image"), place_1.addServiceToPlace);
    router.post("/place/:placeId/menu", authMiddleware_1.authMiddleware, fileMiddleware_1.upload.single("image"), place_1.addMenuItemToPlace);
    router.delete("/place/:placeId/service/:serviceId", authMiddleware_1.authMiddleware, place_1.deleteServiceFromPlace);
    router.delete("/place/:placeId/menu/:menuId", authMiddleware_1.authMiddleware, place_1.deleteMenuItemFromPlace);
};
