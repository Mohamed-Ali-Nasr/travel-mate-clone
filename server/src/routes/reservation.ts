import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  cancelReservation,
  getFreeSlotsForService,
  getReservations,
  makeReservation,
} from "../controllers/reservation";

export default (router: Router) => {
  router.get("/reservation/available", authMiddleware, getFreeSlotsForService);

  router.post("/reservation", authMiddleware, makeReservation);

  router.get("/reservation", authMiddleware, getReservations);

  router.delete(
    "/reservation/:reservationId",
    authMiddleware,
    cancelReservation
  );
};
