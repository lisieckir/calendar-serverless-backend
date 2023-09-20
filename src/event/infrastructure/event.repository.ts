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

    public async findEvents(month: number): Promise<EventModel[]>
    {
        const client = this.provider.connect();

        const response = await client.send(new QueryCommand(
            {
                ExpressionAttributeValues: {
                    ':s': {S: DynamoTypes.CALENDAR_EVENT},
                    ':d': {S: "2023-09-01T00:48:11+0000"}
                },
                TableName: 'events',
                Limit: 20,
                IndexName: 'date_start_index',
                Select: 'ALL_ATTRIBUTES',
                KeyConditionExpression: 'event_type = :s',
                
                // IndexName: 'date_start'
            }
        ))
console.log(response);
        let itemsArray = [];
        response.Items.forEach((element: Record<string, AttributeValue>) => {
            console.log(element.id.S);
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
                    'type' : {S: DynamoTypes.CALENDAR_EVENT },
                    'id' : {S: event.uid},
                    'title' : {S: event.title},
                    'date_start' : {S: event.datetime_start.toISOString()},
                    'date_stop' : {S: event.datetime_stop.toISOString()}
                }
            }
        ));
    }
}