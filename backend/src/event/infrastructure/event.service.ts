import { Inject, Injectable } from "@nestjs/common";
import { EventRepository } from "./event.repository";
import { EventRepositoryInterface } from "../domain/event-repository.interface";
import { EventModel } from "../domain/event.model";

@Injectable()
export class EventService {
    constructor(
      @Inject(EventRepository) 
      private eventRepository: EventRepositoryInterface
    ) {}

    public findEvents(firstDay: Date, lastDay: Date): Promise<EventModel[]>
    {
        const matrix = this.eventRepository.findEvents(firstDay, lastDay);

        return matrix;
    }

    public async createEvent(event: EventModel): Promise<void>
    {
        this.eventRepository.createEvent(event);
    }

    public async removeEvent(uid: string): Promise<void>
    {
       await this.eventRepository.deleteEvent(uid);
    }
}