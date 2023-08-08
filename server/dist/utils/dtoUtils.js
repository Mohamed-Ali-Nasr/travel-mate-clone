"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaceFromBusinessDTO = exports.getReviewDTO = exports.getUserDTO = exports.getPlaceDTO = void 0;
const getPlaceDTO = (place) => {
    const placeDTO = {
        id: place.id,
        name: place.name,
        description: place.description,
        type: place.type,
        thumbnail: place.thumbnail,
        rating: place.rating,
        reviews: place.reviews,
        menu: place.menu,
        services: place.services,
        location: place.location,
        createdBy: place.createdBy,
        address: place.address,
        images: place.images,
        contactInfo: place.contactInfo,
        tags: place.tags,
        openingHours: place.openingHours,
    };
    return placeDTO;
};
exports.getPlaceDTO = getPlaceDTO;
const getUserDTO = (user) => {
    var _a;
    return typeof user !== "string"
        ? {
            id: user._id,
            name: `${user.firstName} ${(_a = user.lastName) !== null && _a !== void 0 ? _a : ""}`,
            profileImage: user.profileImage,
        }
        : { id: user };
};
exports.getUserDTO = getUserDTO;
const getReviewDTO = (review) => {
    return {
        id: review._id,
        user: (0, exports.getUserDTO)(review.user),
        comment: review.comment,
        rating: review.rating,
        image: review.image,
    };
};
exports.getReviewDTO = getReviewDTO;
const getPlaceFromBusinessDTO = (business, { thumbnail, userId, images, }) => {
    const placeObject = {
        _id: undefined,
        name: business.name,
        type: business.type,
        description: business.description,
        address: business.address,
        location: business.location,
        thumbnail: thumbnail,
        createdBy: userId,
        contactInfo: {
            phone: business.phone,
        },
        openingHours: business.openingHours,
        tags: business.tags,
        menu: [],
        services: [],
        reservations: [],
        reviews: [],
        images,
    };
    return placeObject;
};
exports.getPlaceFromBusinessDTO = getPlaceFromBusinessDTO;
