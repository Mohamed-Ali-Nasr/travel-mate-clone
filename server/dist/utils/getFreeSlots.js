"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFreeSlots = exports.getTime = void 0;
const getSlots = (start, stop, duration) => {
    const slots = [];
    const startTime = new Date(start);
    const stopTime = new Date(stop);
    startTime.setMinutes(startTime.getMinutes() + (startTime.getMinutes() % 15));
    stopTime.setMinutes(stopTime.getMinutes() - (stopTime.getMinutes() % 15));
    const temp = new Date(startTime);
    temp.setMinutes(temp.getMinutes() + duration);
    while (temp < stopTime) {
        const start = new Date(startTime);
        const end = new Date(temp);
        startTime.setMinutes(startTime.getMinutes() + 15);
        temp.setMinutes(temp.getMinutes() + 15);
        slots.push({ start, end });
    }
    return slots;
};
const getTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
};
exports.getTime = getTime;
const getDateString = (date) => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
};
const getFreeSlots = (date, openingHours, reservations, duration) => {
    const freeSlots = [];
    const dateString = getDateString(date);
    const openingHour = openingHours.find((openingHour) => openingHour.dayOfWeek === date.getDay() + 1);
    if (!openingHour)
        return freeSlots;
    const openingTime = new Date(`${dateString}T${openingHour.from.padStart(5, "0")}:00Z`);
    const closingTime = new Date(`${dateString}T${openingHour.to.padStart(5, "0")}:00Z`);
    const allSlots = getSlots(openingTime, closingTime, duration);
    allSlots.forEach((slot) => {
        const isFree = reservations.every((reservation) => slot.start.getTime() >= reservation.reservationTime.to.getTime() ||
            slot.end.getTime() <= reservation.reservationTime.from.getTime());
        if (isFree) {
            freeSlots.push(slot.start.toISOString());
        }
    });
    return freeSlots;
};
exports.getFreeSlots = getFreeSlots;
