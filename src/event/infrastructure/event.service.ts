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

    public findEvents(firstDay: Date, lastDay: Date)
    {
        const matrix = this.eventRepository.findEvents(firstDay, lastDay);

        return matrix;
    }

    public async createEvent(event: EventModel)
    {
        this.eventRepository.createEvent(event);
    }
}