import * as AWS from "aws-sdk";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";

const serviceConfigOptions: ServiceConfigurationOptions = {
  region: "ap-northeast-1",
};

AWS.config.apiVersions = {
  dynamodb: "2012-08-10",
};

AWS.config.update(serviceConfigOptions);

// const tableName = "odk-mail-user-info-dev";
// const tableName = "odk-mail-user-info-prod";
const tableName = "odk-mail-user-info-" + process.env.ENV;

export class GetItemRepository {
  private documentClient: AWS.DynamoDB.DocumentClient;

  constructor(documentClient: AWS.DynamoDB.DocumentClient) {
    this.documentClient = documentClient;
  };

  public async requestDynamoDB(
    key: string
  ): Promise<AWS.DynamoDB.DocumentClient.AttributeMap> {
    const params = {
      TableName: tableName,
      Key: {
        biblleMailAddress: key,
      },
      ProjectionExpression: 'biblleMailAddress, oneUid, onePaidStatus'
    };

    try {
      const data = await this.documentClient.get(params).promise();
      console.log(data);
      if (!data.Item) {
        return data;
      } else {
        return data.Item;
      }
    } catch (e) {
      console.error(e);
      throw new Error("User info get operation is failed");
    }
  }
}
