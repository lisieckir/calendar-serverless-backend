import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

@Injectable()
export class DynamodbProvider {
  public connect(): DynamoDBClient {
    return process.env.IS_OFFLINE
      ? new  DynamoDBClient({
          region: 'localhost',
          endpoint: 'http://0.0.0.0:8000',
          credentials: {
            accessKeyId: 'MockAccessKeyId',
            secretAccessKey: 'MockSecretAccessKey'
          },
        })
      : new DynamoDBClient();
  }
}