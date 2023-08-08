import { ILocation } from "../types/ILocation";
import { UserDTO } from "./UserDTO";

export interface ReservationDTO {
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
    location: ILocation;
  };
  user?: UserDTO;
}
