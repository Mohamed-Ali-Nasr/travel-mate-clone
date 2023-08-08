import { IContactInfo } from "./IContactInfo";
import { ILocation } from "./ILocation";
import { IReservation } from "./IReservation";
import { IReview } from "./IReview";
import { IService } from "./IService";
import { IUser } from "./IUser";
import { IMenuItem } from "./MenuItem";
import { IOpeningHours } from "./OpeningHours";

export type IPlace = {
  _id: string;
  name: string;
  type: string;
  description?: string;
  address?: string;
  location: ILocation;
  thumbnail: string;
  images?: string[];
  createdBy: string | IUser;
  contactInfo: IContactInfo;
  tags?: string[];
  menu: IMenuItem[];
  services: IService[];
  reservations: IReservation[];
  reviews: IReview[];
  openingHours: IOpeningHours[];
};