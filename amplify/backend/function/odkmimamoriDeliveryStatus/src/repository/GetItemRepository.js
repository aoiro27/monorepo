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
exports.GetItemRepository = void 0;
const AWS = __importStar(require("aws-sdk"));
const serviceConfigOptions = {
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
class GetItemRepository {
    constructor(documentClient) {
        this.documentClient = documentClient;
    }
    ;
    requestDynamoDB(search_key, search_from, search_to) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('search_key: ' + search_key);
            console.log('search_from: ' + search_from);
            console.log('search_to: ' + search_to);
            console.log('tableName: ' + tableName);
            // console.log('t1: ' + t1);
            // console.log('t2: ' + t2);
            let params = {
                TableName: tableName,
                IndexName: indexName,
                KeyConditionExpression: "deliveredEmail = :key AND deliveredTime BETWEEN :from AND :to",
                ExpressionAttributeValues: {
                    ":key": search_key,
                    ":from": search_from,
                    ":to": search_to,
                },
                ProjectionExpression: 'deliveredEmail, deliveredTime, stationName, biblleTagName'
            };
            try {
                const data = yield this.documentClient.query(params).promise();
                if (data.Items) {
                    return data.Items;
                }
                else {
                    return data;
                }
            }
            catch (e) {
                console.error(e);
                throw new Error("delivery history get operation is failed");
            }
        });
    }
}
exports.GetItemRepository = GetItemRepository;
