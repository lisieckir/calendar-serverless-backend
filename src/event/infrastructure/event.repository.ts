import { Injectable } from "@nestjs/common";
import { EventModel } from "../domain/event.model";
import { EventRepositoryInterface } from "../domain/event-repository.interface";
import { DynamodbProvider } from "src/ dynamodb/dynamodb.provider";
import { AttributeValue, PutItemCommand, QueryCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoTypes } from "src/ dynamodb/dynamodb-types.enum";

@Injectable()
export class EventRepository implements EventRepositoryInterface {
    constructor(
        private provider: DynamodbProvider
    ) {
        this.provider = new DynamodbProvider();
    }

    public async findEvents(firstDay: Date, lastDay: Date): Promise<EventModel[]>
    {
        const client = this.provider.connect();
        const response = await client.send(new ScanCommand(
            {
                ExpressionAttributeValues: {
                    ':ds': {S: firstDay.toISOString()},
                    ':de': {S: lastDay.toISOString()},
                },
                TableName: 'events',
                Limit: 20,
                IndexName: 'date_start_index',
                Select: 'ALL_ATTRIBUTES',
                FilterExpression: "date_start>=:ds AND date_stop<=:de"
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
                    'record_type' : {S: DynamoTypes.CALENDAR_EVENT },
                    'id' : {S: event.uid},
                    'title' : {S: event.title},
                    'date_start' : {S: event.datetime_start.toISOString()},
                    'date_stop' : {S: event.datetime_stop.toISOString()}
                }
            }
        ));
    }
}