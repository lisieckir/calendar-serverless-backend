import { Body, Controller, Get, HttpCode, Inject, Put } from "@nestjs/common";
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
        const now = new Date();
        return this.eventService.findEvents(now.getMonth(),now.getFullYear());
    }

    
    @Put('/')
    @HttpCode(201)
    public async addEvent(@Body() createEventDto: CreateEventDto): Promise<void> {
        await this.eventService.createEvent({
            uid: uuidv4(),
            title: createEventDto.title,
            datetime_start: createEventDto.date_start,
            datetime_stop: createEventDto.date_stop,
        });
    }
}