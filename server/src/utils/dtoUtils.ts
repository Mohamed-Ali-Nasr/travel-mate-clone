import { PlaceDTO } from "../dtos/PlaceDTO";
import { UserDTO } from "../dtos/UserDTO";
import { IReview } from "../types/IReview";
import { IUser } from "../types/IUser";
import { IPlace } from "../types/IPlace";
import BusinessDTO from "../dtos/BusinessDTO";

export const getPlaceDTO = (place: PlaceDTO): PlaceDTO => {
  const placeDTO: PlaceDTO = {
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

export const getUserDTO = (user: IUser | string): UserDTO => {
  return typeof user !== "string"
    ? {
        id: user._id,
        name: `${user.firstName} ${user.lastName ?? ""}`,
        profileImage: user.profileImage,
      }
    : ({ id: user } as UserDTO);
};

export const getReviewDTO = (review: IReview) => {
  return {
    id: review._id,
    user: getUserDTO(review.user),
    comment: review.comment,
    rating: review.rating,
    image: review.image,
  };
};

export const getPlaceFromBusinessDTO = (
  business: BusinessDTO,
  {
    thumbnail,
    userId,
    images,
  }: { thumbnail: string; userId: string; images: string[] }
): IPlace => {
  const placeObject: IPlace = {
    _id: undefined!,
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
