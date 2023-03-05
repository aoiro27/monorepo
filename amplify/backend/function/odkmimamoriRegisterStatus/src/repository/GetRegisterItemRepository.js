"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRegisterItemRepository = void 0;
const AWS = __importStar(require("aws-sdk"));
const serviceConfigOptions = {
    region: "ap-northeast-1",
};
AWS.config.apiVersions = {
    dynamodb: "2012-08-10",
};
AWS.config.update(serviceConfigOptions);
const tableName = "odk-mail-notification-" + process.env.ENV;
const indexName = "biblleMailAddress-index";
class GetRegisterItemRepository {
    constructor(documentClient) {
        this.documentClient = documentClient;
    }
    ;
    requestDynamoDB(key) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('GetRegisterItemRepository_key: ' + key);
            console.log('tableName: ' + tableName);
            console.log('process.env.ENV: ' + process.env.ENV);
            console.log('process.env.REGION: ' + process.env.REGION);
            let tableName2 = "odk-mail-notification-" + process.env.ENV;
            console.log('tableName2: ' + tableName2);
            // const params = {
            //   TableName: tableName,
            //   IndexName: indexName,
            //   Key: {
            //     biblleMailAddress: key,
            //   },
            //   ProjectionExpression: 'biblleTagName, deliveredEmails'
            // };
            let params = {
                TableName: tableName,
                IndexName: indexName,
                KeyConditionExpression: "biblleMailAddress = :key",
                ExpressionAttributeValues: {
                    ":key": key,
                },
                ProjectionExpression: 'biblleTagName, deliveredEmails'
            };
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
                const data = yield this.documentClient.query(params).promise();
                console.log(data);
                if (!data.Items) {
                    return data;
                }
                else {
                    return data.Items;
                }
            }
            catch (e) {
                console.error(e);
                throw new Error("Delivery(Notification) info get operation is failed");
            }
        });
    }
}
exports.GetRegisterItemRepository = GetRegisterItemRepository;
