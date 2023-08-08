import { IUser } from "./IUser";

export interface IReservation {
  id: string;
  date: string;
  duration?: number;
  price: number;
  service: {
    id: string;
    name: string;
    description?: string;
    image?: string;
  };
  place: {
    id: string;
    name: string;
    address?: string;
    image?: string;
    location: {
      type: string;
      coordinates: number[];
    };
  };
  user?: IUser;
}
