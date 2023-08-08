"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PlaceSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: String,
    address: String,
    location: {
        type: { type: String, default: "Point", required: true },
        coordinates: { type: [Number], index: "2dsphere", required: true },
    },
    thumbnail: { type: String, required: true },
    images: [String],
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    contactInfo: {
        phone: { type: String, required: true },
        email: String,
    },
    tags: [String],
    services: [
        {
            name: { type: String, required: true },
            description: String,
            duration: Number,
            price: { type: Number, required: true },
            image: String,
        },
    ],
    menu: [
        {
            name: { type: String, required: true },
            description: String,
            price: { type: Number, required: true },
            image: String,
        },
    ],
    reservations: [
        {
            service: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
            },
            user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
            reservationTime: {
                from: { type: Date, required: true },
                to: { type: Date, required: true },
            },
        },
    ],
    reviews: [
        {
            user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
            rating: { type: Number, required: true },
            comment: String,
        },
    ],
    openingHours: [
        {
            dayOfWeek: { type: Number, required: true },
            from: { type: String, required: true },
            to: { type: String, required: true },
        },
    ],
});
PlaceSchema.index({
    name: "text",
    description: "text",
    address: "text",
    type: "text",
    tags: "text",
});
exports.default = (0, mongoose_1.model)("Place", PlaceSchema);
