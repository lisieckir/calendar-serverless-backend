export class EventModel {
    constructor(
    public uid: string,
    public title: string,
    public datetime_start: Date,
    public datetime_stop: Date
    ) {}
}