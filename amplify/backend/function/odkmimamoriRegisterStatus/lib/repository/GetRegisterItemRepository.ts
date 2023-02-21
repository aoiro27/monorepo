import * as AWS from "aws-sdk";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";

const serviceConfigOptions: ServiceConfigurationOptions = {
  region: "ap-northeast-1",
};

AWS.config.apiVersions = {
  dynamodb: "2012-08-10",
};

AWS.config.update(serviceConfigOptions);

const tableName = "odk-mail-notification-" + process.env.ENV;
const indexName = "biblleMailAddress-index";

export class GetRegisterItemRepository {
  private documentClient: AWS.DynamoDB.DocumentClient;

  constructor(documentClient: AWS.DynamoDB.DocumentClient) {
    this.documentClient = documentClient;
  };

  public async requestDynamoDB(
    key: string
  ): Promise<AWS.DynamoDB.DocumentClient.AttributeMap> {
    console.log('GetRegisterItemRepository_key: ' + key)
    console.log('tableName: ' + tableName)
    // const params = {
    //   TableName: tableName,
    //   IndexName: indexName,
    //   Key: {
    //     biblleMailAddress: key,
    //   },
    //   ProjectionExpression: 'biblleTagName, deliveredEmails'
    // };
    let params: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: "biblleMailAddress = :key",
      ExpressionAttributeValues: {
        ":key": key,
      },
      ProjectionExpression: 'biblleTagName, deliveredEmails'
    }
  // public async requestDynamoDB(
  //   key: string
  // ): Promise<string> {
  //     let params: AWS.DynamoDB.DocumentClient.QueryInput = {
  //     TableName: tableName,
  //     IndexName: indexName,
  //     KeyConditionExpression: "biblleMailAddress = :key",
  //     ExpressionAttributeValues: {
  //       ":key": key,
  //     },
  //     ProjectionExpression: 'biblleTagName, deliveredEmails'
  //   }
    try {
      const data = await this.documentClient.query(params).promise();
      console.log(data);
      if (!data.Items) {
        return data;
      } else {
        return data.Items;
      }
    } catch (e) {
      console.error(e);
      throw new Error("Delivery(Notification) info get operation is failed");
    }
  }
}
