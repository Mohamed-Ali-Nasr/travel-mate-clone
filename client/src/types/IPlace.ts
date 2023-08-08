import IOpeningHours from "./IOpeningHours";
import { IReview } from "./IReview";
import { IUser } from "./IUser";

export interface IPlace {
  id: string;
  name: string;
  description?: string;
  type: string;
  thumbnail: string;
  rating?: number;
  address?: string;
  reviews: IReview[];
  openingHours: IOpeningHours[];
  location: {
    type: string;
    coordinates: number[];
  };
  services: {
    id: string;
    name: string;
    description?: string;
    duration?: number;
    price: number;
    image?: string;
  }[];
  menu: {
    id: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
  }[];
  createdBy: IUser;
  images: string[];
  contactInfo: {
    phone: string;
    email?: string;
  };
  tags?: string[];
}

export default IPlace;
