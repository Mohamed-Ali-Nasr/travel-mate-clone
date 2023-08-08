import { IService } from "./IService";
import { IUser } from "./IUser";

export type IReservationTime = {
  from: Date;
  to: Date;
};

export type IReservation = {
  _id: string;
  service: string | IService;
  user: string | IUser;
  reservationTime: IReservationTime;
};
