"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = require("../middlewares/authMiddleware");
const reservation_1 = require("../controllers/reservation");
exports.default = (router) => {
    router.get("/reservation/available", authMiddleware_1.authMiddleware, reservation_1.getFreeSlotsForService);
    router.post("/reservation", authMiddleware_1.authMiddleware, reservation_1.makeReservation);
    router.get("/reservation", authMiddleware_1.authMiddleware, reservation_1.getReservations);
    router.delete("/reservation/:reservationId", authMiddleware_1.authMiddleware, reservation_1.cancelReservation);
};
