import { NextFunction, RequestHandler, Response } from "express";
import Place from "../schemas/Place";
import { IFreeSlotsDTO } from "../dtos/FreeSlotsDTO";
import { getFreeSlots } from "../utils/getFreeSlots";
import { IReservation } from "../types/IReservation";
import { IRequest } from "../middlewares/authMiddleware";
import { IUser } from "../types/IUser";
import { ReservationDTO } from "../dtos/ReservationDTO";
import { getUserDTO } from "../utils/dtoUtils";
import createHttpError from "http-errors";

export const getFreeSlotsForService: RequestHandler = async (
  req,
  res,
  next
) => {
  const { placeId, serviceId } = req.query;

  if (!serviceId || !placeId) {
    throw createHttpError(400, "Invalid request.");
  }

  try {
    const place = await Place.findById(placeId).populate(
      "reviews.user createdBy"
    );

    if (!place) {
      throw createHttpError(404, "Place not found!");
    }

    const service = place.services.find(
      (service) => service._id.toString() === serviceId
    );

    if (!service) {
      throw createHttpError(404, "Service not found!");
    }

    const { reservations, openingHours } = place;

    const currentDate = new Date();

    const freeSlots: IFreeSlotsDTO[] = [];

    [...Array(14).keys()].forEach(() => {
      currentDate.setDate(currentDate.getDate() + 1);
      const freeSlotsForDay = getFreeSlots(
        currentDate,
        openingHours,
        reservations,
        service.duration ?? 15
      );

      if (freeSlotsForDay.length > 0) {
        freeSlots.push(...freeSlotsForDay);
      }
    });
    res.status(200).json(freeSlots);
  } catch (error) {
    next(error);
  }
};

const getEndTime = (startDate: Date, duration: number) => {
  const endDate = new Date(startDate);
  endDate.setMinutes(endDate.getMinutes() + duration);
  return endDate;
};

export const makeReservation = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { placeId, serviceId, date } = req.body;

  const userId = req.userId!;

  if (!serviceId || !date || !placeId) {
    throw createHttpError(400, "Invalid data.");
  }

  try {
    const place = await Place.findById(placeId).populate(
      "reviews.user createdBy"
    );

    if (!place) {
      throw createHttpError(404, "Place not found!");
    }

    const service = place.services.find(
      (service) => service._id.toString() === serviceId
    );

    if (!service) {
      throw createHttpError(404, "Service not found!");
    }

    const { reservations } = place;

    const currentDate = new Date();

    const freeSlots: IFreeSlotsDTO[] = [];

    [...Array(14).keys()].forEach(() => {
      currentDate.setDate(currentDate.getDate() + 1);
      const freeSlotsForDay = getFreeSlots(
        currentDate,
        place.openingHours,
        reservations,
        service.duration ?? 15
      );

      if (freeSlotsForDay.length > 0) {
        freeSlots.push(...freeSlotsForDay);
      }
    });

    const dateMs = new Date(date).getTime();

    const slot = freeSlots.find((slot) => new Date(slot).getTime() === dateMs);

    if (!slot) {
      throw createHttpError(400, "Please choose another time.");
    }

    const reservation: IReservation = {
      _id: undefined!,
      service: serviceId,
      user: userId,
      reservationTime: {
        from: new Date(date),
        to: getEndTime(new Date(date), service.duration ?? 15),
      },
    };

    place.reservations.push(reservation);
    await place.save();
    res.status(200).json({ message: "Reservation created successfully." });
  } catch (error) {
    next(error);
  }
};

export const getReservations = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;

  try {
    const places = await Place.find({
      "reservations.user": userId,
      $or: [{ "reservations.user": userId }, { createdBy: userId }],
    }).populate("reservations.user createdBy");

    const reservations = places.reduce((acc, place) => {
      place.reservations.forEach((reservation) => {
        const user = reservation.user as IUser;

        if (
          user._id.toString() !== userId &&
          (place.createdBy as IUser)._id.toString() !== userId
        )
          return;

        const service = place.services.find(
          (service) => service._id.toString() === reservation.service.toString()
        );

        if (!service) return;

        const reservationDTO: ReservationDTO = {
          id: reservation._id,
          duration: service.duration,
          date: reservation.reservationTime.from.toISOString(),
          price: service.price,
          place: {
            id: place._id,
            name: place.name,
            address: place.address,
            image: place.thumbnail,
            location: place.location,
          },
          service: {
            id: service._id,
            name: service.name,
            description: service.description,
            image: service.image,
          },
          user:
            (place.createdBy as IUser)._id.toString() === userId
              ? getUserDTO(user)
              : undefined,
        };
        acc.push(reservationDTO);
      });
      return acc;
    }, [] as ReservationDTO[]);
    res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
};

export const cancelReservation = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { reservationId } = req.params;

  if (!reservationId) {
    throw createHttpError(400, "Invalid data.");
  }

  try {
    const place = await Place.findOne({
      "reservations._id": reservationId,
    }).populate("reservations.user createdBy");

    if (!place) {
      throw createHttpError(404, "Reservation not found!");
    }

    const reservation = place.reservations.find(
      (reservation) => reservation._id.toString() === reservationId
    );

    if (!reservation) {
      throw createHttpError(404, "Reservation not found!");
    }

    if (
      (reservation.user as IUser)._id.toString() !== req.userId &&
      (place.createdBy as IUser)._id.toString() !== req.userId
    ) {
      throw createHttpError(401, "Reservation not found!");
    }

    place.reservations = place.reservations.filter(
      (reservation) => reservation._id.toString() !== reservationId
    );
    await place.save();
    res.status(200).json({ message: "Reservation canceled successfully." });
  } catch (error) {
    next(error);
  }
};
