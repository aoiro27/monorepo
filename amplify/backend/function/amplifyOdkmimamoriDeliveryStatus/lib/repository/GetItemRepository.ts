import * as AWS from "aws-sdk";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";

const serviceConfigOptions: ServiceConfigurationOptions = {
  region: "ap-northeast-1",
};

AWS.config.apiVersions = {
  dynamodb: "2012-08-10",
};

AWS.config.update(serviceConfigOptions);

const tableName = "odk-mail-delivery-history-dev";
// const tableName = "odk-mail-delivery-history-prod";

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
    // exp: string
    // if (search_from != null && search_to != null){
    //   exp = "deliveredEmail IN :key AND deliveredTime BETWEEN :from AND :to";
    // } else if (search_from != null && search_to == null){
    //   const exp = "deliveredEmail IN :key AND deliveredTime >= :from";
    // } else if (search_from == null && search_to != null){
    //   const exp = "deliveredEmail IN :key AND deliveredTime <= :to";
    // } else {
    //   const exp = "deliveredEmail IN :key";
    // }
    const params = {
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: "deliveredEmail IN :key AND deliveredTime BETWEEN :from AND :to",
      ExpressionAttributeValues: {
        "key": search_key,
        "from": search_from,
        "to": search_to,
      },
    };

    try {
      const data = await this.documentClient.get(params).promise();
      if (!data.Item) {
        return data;
      } else {
        return data.Item;
      }
    } catch (e) {
      console.error(e);
      throw new Error("Delivered history get operation is failed");
    }
  }
}
