import * as AWS from "aws-sdk";
import { ItemList } from "aws-sdk/clients/dynamodb";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";

const serviceConfigOptions: ServiceConfigurationOptions = {
  region: "ap-northeast-1",
};

AWS.config.apiVersions = {
  dynamodb: "2012-08-10",
};

AWS.config.update(serviceConfigOptions);

// const t1 = process.env.TABLENAME;
// const t2 = t1 && process.env.ENV;
const tableName = "odk-mail-delivery-history-" + process.env.ENV;
// const tableName = "odk-mail-delivery-history-dev";
const indexName = "deliveredEmail-deliveredTime-index";

export class GetItemRepository {
  private documentClient: AWS.DynamoDB.DocumentClient;

  constructor(documentClient: AWS.DynamoDB.DocumentClient) {
    this.documentClient = documentClient;
  };

  public async requestDynamoDB(
    search_key: string,
    search_from: string,
    search_to: string
  ): Promise<AWS.DynamoDB.DocumentClient.AttributeMap> {
    console.log('search_key: ' + search_key);
    console.log('search_from: ' + search_from);
    console.log('search_to: ' + search_to);
    console.log('tableName: ' + tableName);
    // console.log('t1: ' + t1);
    // console.log('t2: ' + t2);
    let params: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: "deliveredEmail = :key AND deliveredTime BETWEEN :from AND :to",
      ExpressionAttributeValues: {
        ":key": search_key,
        ":from": search_from,
        ":to": search_to,
      },
      ProjectionExpression: 'deliveredEmail, deliveredTime, stationName, biblleTagName'
    }
    try {
      const data = await this.documentClient.query(params).promise();
      if (data.Items) {
        return data.Items;
      } else {
        return data;
      }
    } catch (e) {
      console.error(e);
      throw new Error("delivery history get operation is failed");
    }
  }
}
