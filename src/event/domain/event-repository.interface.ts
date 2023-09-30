import { EventModel } from "./event.model";

export interface EventRepositoryInterface {
    findEvents(firstDay: Date, lastDay: Date): Promise<EventModel[]>;
    createEvent(event: EventModel): Promise<void>;
    deleteEvent(uid: string): Promise<void>;
}