import { Address } from "../../addresses/entities/address.entity";
import { CategoryType } from "../entities/event.entity";

export interface EventResponse {
    id: string;
    name: string;
    description?: string | null;
    image?: string | null;
    startDate: Date;
    endDate: Date;
    capacity: number;
    category: CategoryType;
    organiserId: string;
    address: Address;
    numParticipants: number;
    participating: boolean;
}