import { EventResponse } from "../interfaces/event-response.interface";
import { Event } from "../entities/event.entity";

export const getEventResponseDto = (event: Event, userId: string): EventResponse => {
    return {
        id: event.id,
        name: event.name,
        description: event.description,
        image: event.image,
        startDate: event.startDate,
        endDate: event.endDate,
        capacity: event.capacity,
        category: event.category,
        organiserId: event.organiserId, 
        address: event.address,
        numParticipants: event.participants.length,
        participating: event.participants.some(participant => participant.userId === userId),
    };
}