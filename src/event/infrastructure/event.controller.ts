import { Body, Controller, Get, HttpCode, Inject, Put, Query } from "@nestjs/common";
import { EventService } from "./event.service";
import { v4 as uuidv4 } from 'uuid';
import { CreateEventDto } from "../application/create-event.dto";
import e from "express";
import { GetEventsDto } from "../application/get-events.dto";

@Controller('/events')
export class EventController {

    public constructor(
        private eventService: EventService
    ) {}

    @Get('/')
    public getCurrentMonth(@Query() dataDto: GetEventsDto) {
        return this.eventService.findEvents(dataDto.start, dataDto.stop);
    }

    
    @Put('/')
    @HttpCode(201)
    public async addEvent(@Body() createEventDto: CreateEventDto): Promise<void> {
        console.log(createEventDto);
        await this.eventService.createEvent({
            uid: uuidv4(),
            title: createEventDto.title,
            datetime_start: createEventDto.date_start,
            datetime_stop: createEventDto.date_stop,
        });
    }
}