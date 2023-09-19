import { Controller, Get, Inject, Put } from "@nestjs/common";
import { EventService } from "./event.service";
import { v4 as uuidv4 } from 'uuid';

@Controller('/events')
export class EventController {

    public constructor(
        private eventService: EventService
    ) {}

    @Get('/')
    public getCurrentMonth() {
        return this.eventService.findEvents(9,2023);
    }

    
    @Put('/')
    public addEvent() {
        return this.eventService.createEvent({
            uid: uuidv4(),
            title: "aaaa",
            datetime_start: new Date(),
            datetime_stop: new Date('+8 days'),
        });
    }
}