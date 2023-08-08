import { IOpeningHours } from "../types/OpeningHours";

interface BusinessDTO {
  name: string;
  type: string;
  description?: string;
  address?: string;
  location: {
    type: string;
    coordinates: number[];
  };
  phone: string;
  tags?: string[];
  openingHours: IOpeningHours[];
}

export default BusinessDTO;
