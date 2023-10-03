import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Put, Query } from "@nestjs/common";
import { EventService } from "./event.service";
import { v4 as uuidv4 } from 'uuid';
import { CreateEventDto } from "../application/create-event.dto";
import { GetEventsDto } from "../application/get-events.dto";

@Controller('/events')
export class EventController {

    public constructor(
        private eventService: EventService
    ) {}

    @Get('/')
    public getEvents(@Query() dataDto: GetEventsDto) {
        return this.eventService.findEvents(dataDto.start, dataDto.stop);
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

        
    @Delete('/:uid')
    @HttpCode(201)
    public async removeEvent(@Param('uid') uid: string): Promise<void> {
        await this.eventService.removeEvent(uid);
    }
}