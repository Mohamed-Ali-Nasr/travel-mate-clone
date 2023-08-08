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
exports.deleteMenuItemFromPlace = exports.addMenuItemToPlace = exports.deleteServiceFromPlace = exports.addServiceToPlace = exports.deletePlace = exports.updatePlace = exports.createPlace = exports.getPlace = exports.searchPlaces = void 0;
const Place_1 = __importDefault(require("../schemas/Place"));
const dtoUtils_1 = require("./../utils/dtoUtils");
const mongoose_1 = __importDefault(require("mongoose"));
const http_errors_1 = __importDefault(require("http-errors"));
const imageRepository_1 = require("../repositories/imageRepository");
const searchPlaces = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = req.query.search;
    const { priceFrom, priceTo, type } = req.query;
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filters = {
            $and: [
                {
                    $or: [
                        { name: new RegExp(searchQuery, "i") },
                        { type: new RegExp(searchQuery, "i") },
                        { description: new RegExp(searchQuery, "i") },
                    ],
                },
            ],
        };
        if (priceFrom) {
            filters.$and.push({
                $or: [
                    { "menu.price": { $gte: priceFrom } },
                    { "services.price": { $gte: priceFrom } },
                ],
            });
        }
        if (priceTo) {
            filters.$and.push({
                $or: [
                    { "menu.price": { $lte: priceTo } },
                    { "services.price": { $lte: priceTo } },
                ],
            });
        }
        if (type) {
            filters.$and.push({ type: type });
        }
        const places = yield Place_1.default.find(filters).populate("reviews.user createdBy");
        const placesDTOs = places.map((place) => {
            const { _id, reviews, menu, services, createdBy } = place.toObject();
            const reviewDTOs = reviews.map((review) => (0, dtoUtils_1.getReviewDTO)(review));
            const rating = (reviewDTOs === null || reviewDTOs === void 0 ? void 0 : reviewDTOs.reduce((acc, review) => acc + review.rating, 0)) /
                reviewDTOs.length;
            const creator = (0, dtoUtils_1.getUserDTO)(createdBy);
            const menuDTO = menu.map((menuItem) => {
                return Object.assign(Object.assign({}, menuItem), { id: menuItem._id });
            });
            const servicesDTO = services.map((service) => {
                return Object.assign(Object.assign({}, service), { id: service._id });
            });
            const openingHours = place.openingHours;
            for (let i = 0; i < 7; i++) {
                if (!place.openingHours.find((o) => o.dayOfWeek === i)) {
                    openingHours.push({ dayOfWeek: i, from: "--:--", to: "--:--" });
                }
            }
            openingHours.sort((a, b) => ((a.dayOfWeek + 6) % 7) - ((b.dayOfWeek + 6) % 7));
            return (0, dtoUtils_1.getPlaceDTO)(Object.assign(Object.assign({}, place.toObject()), { id: _id, reviews: reviewDTOs, rating, createdBy: creator, menu: menuDTO, services: servicesDTO, openingHours }));
        });
        res.status(200).json(placesDTOs);
    }
    catch (error) {
        next(error);
    }
});
exports.searchPlaces = searchPlaces;
const getPlace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { placeId } = req.params;
    try {
        const place = yield Place_1.default.findById(placeId).populate("reviews.user createdBy");
        if (!place) {
            throw (0, http_errors_1.default)(404, "Place not found!");
        }
        const { _id, reviews, menu, services, createdBy } = place.toObject();
        const reviewDTOs = reviews.map((review) => (0, dtoUtils_1.getReviewDTO)(review));
        const rating = (reviewDTOs === null || reviewDTOs === void 0 ? void 0 : reviewDTOs.reduce((acc, review) => acc + review.rating, 0)) /
            reviewDTOs.length;
        const creator = (0, dtoUtils_1.getUserDTO)(createdBy);
        const menuDTO = menu.map((menuItem) => {
            return Object.assign(Object.assign({}, menuItem), { id: menuItem._id });
        });
        const servicesDTO = services.map((service) => {
            return Object.assign(Object.assign({}, service), { id: service._id });
        });
        const openingHours = place.openingHours;
        for (let i = 0; i < 7; i++) {
            if (!place.openingHours.find((o) => o.dayOfWeek === i)) {
                openingHours.push({ dayOfWeek: i, from: "--:--", to: "--:--" });
            }
        }
        openingHours.sort((a, b) => ((a.dayOfWeek + 6) % 7) - ((b.dayOfWeek + 6) % 7));
        const placeDTO = (0, dtoUtils_1.getPlaceDTO)(Object.assign(Object.assign({}, place.toObject()), { id: _id, reviews: reviewDTOs, rating, createdBy: creator, menu: menuDTO, services: servicesDTO, openingHours }));
        res.status(200).json(placeDTO);
    }
    catch (error) {
        next(error);
    }
});
exports.getPlace = getPlace;
const createPlace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const files = req.files;
    const thumbnailFile = (files === null || files === void 0 ? void 0 : files.thumbnail)
        ? files.thumbnail[0]
        : undefined;
    const imagesFiles = (files === null || files === void 0 ? void 0 : files.images)
        ? files.images
        : undefined;
    if (!thumbnailFile) {
        throw (0, http_errors_1.default)(400, "Missing thumbnail");
    }
    const businessDTO = JSON.parse(req.body.business);
    const { name, type, location, phone, openingHours } = businessDTO;
    if (!name || !type || !location || !phone || !openingHours) {
        throw (0, http_errors_1.default)(400, "Missing required fields");
    }
    try {
        const thumbnail = yield (0, imageRepository_1.imageSave)(thumbnailFile);
        const images = Array.isArray(imagesFiles)
            ? yield Promise.all(imagesFiles.map(imageRepository_1.imageSave))
            : [];
        const placeObject = (0, dtoUtils_1.getPlaceFromBusinessDTO)(businessDTO, {
            userId,
            thumbnail: thumbnail,
            images,
        });
        const place = yield Place_1.default.create(placeObject);
        res.status(201).json({
            message: "Place created successfully",
            placeId: place._id.toString(),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createPlace = createPlace;
const updatePlace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { placeId } = req.params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const files = req.files;
    const thumbnailFile = (files === null || files === void 0 ? void 0 : files.thumbnail)
        ? files.thumbnail[0]
        : undefined;
    const imagesFiles = (files === null || files === void 0 ? void 0 : files.images)
        ? files.images
        : undefined;
    const businessDTO = JSON.parse(req.body.business);
    const { name, type, location, phone, openingHours } = businessDTO;
    if (!name || !type || !location || !phone || !openingHours) {
        throw (0, http_errors_1.default)(400, "Missing required fields");
    }
    try {
        const place = yield Place_1.default.findById(placeId);
        if (!place) {
            throw (0, http_errors_1.default)(404, "Place not found");
        }
        if (place.createdBy.toString() !== req.userId) {
            throw (0, http_errors_1.default)(403, "Unauthorized");
        }
        place.name = name;
        place.type = type;
        place.location = location;
        place.contactInfo.phone = phone;
        place.openingHours = openingHours;
        place.address = businessDTO.address;
        place.description = businessDTO.description;
        place.tags = businessDTO.tags;
        if (thumbnailFile) {
            const oldThumbnail = place.thumbnail;
            place.thumbnail = yield (0, imageRepository_1.imageSave)(thumbnailFile);
            (0, imageRepository_1.imageDelete)(oldThumbnail);
        }
        if (Array.isArray(imagesFiles)) {
            const oldImages = place.images;
            place.images = yield Promise.all(imagesFiles.map(imageRepository_1.imageSave));
            oldImages === null || oldImages === void 0 ? void 0 : oldImages.forEach(imageRepository_1.imageDelete);
        }
        yield place.save();
        res.status(201).json({
            message: "Place updated successfully",
            placeId: place._id.toString(),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updatePlace = updatePlace;
const deletePlace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { placeId } = req.params;
    try {
        const place = yield Place_1.default.findById(placeId);
        if (!place) {
            throw (0, http_errors_1.default)(404, "Place not found");
        }
        if (place.createdBy.toString() !== req.userId) {
            throw (0, http_errors_1.default)(403, "Unauthorized");
        }
        yield (0, imageRepository_1.imageDelete)(place.thumbnail);
        if (place.images)
            yield Promise.all(place.images.map(imageRepository_1.imageDelete));
        place.deleteOne();
        res.status(200).json({ message: "Place deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deletePlace = deletePlace;
const addServiceToPlace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.file;
    const { placeId } = req.params;
    const { name, description, price, duration } = JSON.parse(req.body.service);
    if (!placeId || !name || !price || typeof duration === "undefined") {
        throw (0, http_errors_1.default)(400, "Missing data");
    }
    try {
        const place = yield Place_1.default.findById(placeId);
        if (!place) {
            throw (0, http_errors_1.default)(404, "Place not found");
        }
        if (place.createdBy.toString() !== req.userId) {
            throw (0, http_errors_1.default)(403, "Unauthorized");
        }
        const imageName = image ? yield (0, imageRepository_1.imageSave)(image) : undefined;
        place.services.push({
            _id: new mongoose_1.default.Types.ObjectId().toString(),
            name,
            description,
            price,
            duration,
            image: imageName,
        });
        yield place.save();
        res.status(200).json({ message: "Service added successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.addServiceToPlace = addServiceToPlace;
const deleteServiceFromPlace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { placeId, serviceId } = req.params;
    if (!placeId || !serviceId) {
        throw (0, http_errors_1.default)(400, "Missing data");
    }
    try {
        const place = yield Place_1.default.findById(placeId);
        if (!place) {
            throw (0, http_errors_1.default)(404, "Place not found");
        }
        if (place.createdBy.toString() !== req.userId) {
            throw (0, http_errors_1.default)(403, "Unauthorized");
        }
        const service = place.services.find((service) => service._id.toString() === serviceId);
        if (service === null || service === void 0 ? void 0 : service.image)
            yield (0, imageRepository_1.imageDelete)(service.image);
        place.services = place.services.filter((service) => service._id.toString() !== serviceId);
        place.reservations = place.reservations.filter((reservation) => reservation.service.toString() !== serviceId);
        yield place.save();
        res.status(200).json({ message: "Service deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteServiceFromPlace = deleteServiceFromPlace;
const addMenuItemToPlace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.file;
    const { placeId } = req.params;
    const { name, description, price } = JSON.parse(req.body.menu);
    if (!placeId || !name || !price) {
        throw (0, http_errors_1.default)(400, "Missing data");
    }
    try {
        const place = yield Place_1.default.findById(placeId);
        if (!place) {
            throw (0, http_errors_1.default)(404, "Place not found");
        }
        if (place.createdBy.toString() !== req.userId) {
            throw (0, http_errors_1.default)(403, "Unauthorized");
        }
        const imageName = image ? yield (0, imageRepository_1.imageSave)(image) : undefined;
        place.menu.push({
            _id: new mongoose_1.default.Types.ObjectId().toString(),
            name,
            description,
            price,
            image: imageName,
        });
        yield place.save();
        res.status(200).json({ message: "Menu added successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.addMenuItemToPlace = addMenuItemToPlace;
const deleteMenuItemFromPlace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { placeId, menuId } = req.params;
    if (!placeId || !menuId) {
        throw (0, http_errors_1.default)(400, "Missing data");
    }
    try {
        const place = yield Place_1.default.findById(placeId);
        if (!place) {
            throw (0, http_errors_1.default)(404, "Place not found");
        }
        if (place.createdBy.toString() !== req.userId) {
            throw (0, http_errors_1.default)(403, "Unauthorized");
        }
        const menuItem = place.menu.find((menu) => menu._id.toString() === menuId);
        if (menuItem === null || menuItem === void 0 ? void 0 : menuItem.image)
            yield (0, imageRepository_1.imageDelete)(menuItem.image);
        place.menu = place.menu.filter((menu) => menu._id.toString() !== menuId);
        yield place.save();
        res.status(200).json({ message: "Menu deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteMenuItemFromPlace = deleteMenuItemFromPlace;
