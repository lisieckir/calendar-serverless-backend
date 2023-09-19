import { Body, Controller, Get, Inject, Put } from "@nestjs/common";
import { EventService } from "./event.service";
import { v4 as uuidv4 } from 'uuid';
import { CreateEventDto } from "../application/create-event.dto";

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
    public addEvent(@Body() createEventDto: CreateEventDto) {
        console.log(createEventDto);
        console.log(createEventDto.date_start instanceof Date);

        return createEventDto;
        return this.eventService.createEvent({
            uid: uuidv4(),
            title: createEventDto.title,
            datetime_start: createEventDto.date_start,
            datetime_stop: createEventDto.date_stop,
        });
    }
}