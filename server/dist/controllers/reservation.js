"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelReservation = exports.getReservations = exports.makeReservation = exports.getFreeSlotsForService = void 0;
const Place_1 = __importDefault(require("../schemas/Place"));
const getFreeSlots_1 = require("../utils/getFreeSlots");
const dtoUtils_1 = require("../utils/dtoUtils");
const http_errors_1 = __importDefault(require("http-errors"));
const getFreeSlotsForService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { placeId, serviceId } = req.query;
    if (!serviceId || !placeId) {
        throw (0, http_errors_1.default)(400, "Invalid request.");
    }
    try {
        const place = yield Place_1.default.findById(placeId).populate("reviews.user createdBy");
        if (!place) {
            throw (0, http_errors_1.default)(404, "Place not found!");
        }
        const service = place.services.find((service) => service._id.toString() === serviceId);
        if (!service) {
            throw (0, http_errors_1.default)(404, "Service not found!");
        }
        const { reservations, openingHours } = place;
        const currentDate = new Date();
        const freeSlots = [];
        [...Array(14).keys()].forEach(() => {
            var _a;
            currentDate.setDate(currentDate.getDate() + 1);
            const freeSlotsForDay = (0, getFreeSlots_1.getFreeSlots)(currentDate, openingHours, reservations, (_a = service.duration) !== null && _a !== void 0 ? _a : 15);
            if (freeSlotsForDay.length > 0) {
                freeSlots.push(...freeSlotsForDay);
            }
        });
        res.status(200).json(freeSlots);
    }
    catch (error) {
        next(error);
    }
});
exports.getFreeSlotsForService = getFreeSlotsForService;
const getEndTime = (startDate, duration) => {
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + duration);
    return endDate;
};
const makeReservation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { placeId, serviceId, date } = req.body;
    const userId = req.userId;
    if (!serviceId || !date || !placeId) {
        throw (0, http_errors_1.default)(400, "Invalid data.");
    }
    try {
        const place = yield Place_1.default.findById(placeId).populate("reviews.user createdBy");
        if (!place) {
            throw (0, http_errors_1.default)(404, "Place not found!");
        }
        const service = place.services.find((service) => service._id.toString() === serviceId);
        if (!service) {
            throw (0, http_errors_1.default)(404, "Service not found!");
        }
        const { reservations } = place;
        const currentDate = new Date();
        const freeSlots = [];
        [...Array(14).keys()].forEach(() => {
            var _a;
            currentDate.setDate(currentDate.getDate() + 1);
            const freeSlotsForDay = (0, getFreeSlots_1.getFreeSlots)(currentDate, place.openingHours, reservations, (_a = service.duration) !== null && _a !== void 0 ? _a : 15);
            if (freeSlotsForDay.length > 0) {
                freeSlots.push(...freeSlotsForDay);
            }
        });
        const dateMs = new Date(date).getTime();
        const slot = freeSlots.find((slot) => new Date(slot).getTime() === dateMs);
        if (!slot) {
            throw (0, http_errors_1.default)(400, "Please choose another time.");
        }
        const reservation = {
            _id: undefined,
            service: serviceId,
            user: userId,
            reservationTime: {
                from: new Date(date),
                to: getEndTime(new Date(date), (_a = service.duration) !== null && _a !== void 0 ? _a : 15),
            },
        };
        place.reservations.push(reservation);
        yield place.save();
        res.status(200).json({ message: "Reservation created successfully." });
    }
    catch (error) {
        next(error);
    }
});
exports.makeReservation = makeReservation;
const getReservations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const places = yield Place_1.default.find({
            "reservations.user": userId,
            $or: [{ "reservations.user": userId }, { createdBy: userId }],
        }).populate("reservations.user createdBy");
        const reservations = places.reduce((acc, place) => {
            place.reservations.forEach((reservation) => {
                const user = reservation.user;
                if (user._id.toString() !== userId &&
                    place.createdBy._id.toString() !== userId)
                    return;
                const service = place.services.find((service) => service._id.toString() === reservation.service.toString());
                if (!service)
                    return;
                const reservationDTO = {
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
                    user: place.createdBy._id.toString() === userId
                        ? (0, dtoUtils_1.getUserDTO)(user)
                        : undefined,
                };
                acc.push(reservationDTO);
            });
            return acc;
        }, []);
        res.status(200).json(reservations);
    }
    catch (error) {
        next(error);
    }
});
exports.getReservations = getReservations;
const cancelReservation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { reservationId } = req.params;
    if (!reservationId) {
        throw (0, http_errors_1.default)(400, "Invalid data.");
    }
    try {
        const place = yield Place_1.default.findOne({
            "reservations._id": reservationId,
        }).populate("reservations.user createdBy");
        if (!place) {
            throw (0, http_errors_1.default)(404, "Reservation not found!");
        }
        const reservation = place.reservations.find((reservation) => reservation._id.toString() === reservationId);
        if (!reservation) {
            throw (0, http_errors_1.default)(404, "Reservation not found!");
        }
        if (reservation.user._id.toString() !== req.userId &&
            place.createdBy._id.toString() !== req.userId) {
            throw (0, http_errors_1.default)(401, "Reservation not found!");
        }
        place.reservations = place.reservations.filter((reservation) => reservation._id.toString() !== reservationId);
        yield place.save();
        res.status(200).json({ message: "Reservation canceled successfully." });
    }
    catch (error) {
        next(error);
    }
});
exports.cancelReservation = cancelReservation;
