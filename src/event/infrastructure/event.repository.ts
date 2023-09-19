import { Injectable } from "@nestjs/common";
import { EventModel } from "../domain/event.model";
import { EventRepositoryInterface } from "../domain/event-repository.interface";
import { DynamodbProvider } from "src/ dynamodb/dynamodb.provider";
import { AttributeValue, PutItemCommand, QueryCommand, ScanCommand } from "@aws-sdk/client-dynamodb";

@Injectable()
export class EventRepository implements EventRepositoryInterface {
    constructor(
        private provider: DynamodbProvider
    ) {
        this.provider = new DynamodbProvider();
    }

    public async findEvents(month: number): Promise<EventModel[]>
    {
        const client = this.provider.connect();

        const response = await client.send(new ScanCommand(
            {
                TableName: 'events',
                // IndexName: 'date_start'
            }
        ))

        let itemsArray = [];
        response.Items.forEach((element: Record<string, AttributeValue>) => {
            itemsArray.push(new EventModel(element.id.S, element.title.S, new Date(element.date_start.S), new Date(element.date_stop.S)))
        } );

        return itemsArray;
    }

    public async createEvent(event: EventModel): Promise<void>
    {
        const client = this.provider.connect();

        await client.send(new PutItemCommand(
            {
                TableName: 'events',
                Item: {
                    'id' : {S: event.uid},
                    'title' : {S: event.title},
                    'date_start' : {S: event.datetime_start.toISOString()},
                    'date_stop' : {S: event.datetime_stop.toISOString()}
                }
            }
        ));
    }
}