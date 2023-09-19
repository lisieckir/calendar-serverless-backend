import { EventModel } from "./event.model";

export interface EventRepositoryInterface {
    findEvents(month: number): Promise<EventModel[]>;
    createEvent(event: EventModel): void;
}