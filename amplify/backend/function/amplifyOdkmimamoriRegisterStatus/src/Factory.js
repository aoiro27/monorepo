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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
const GetItemRepository_1 = require("./repository/GetItemRepository");
const GetItemService_1 = require("./service/GetItemService");
const GetRegisterItemRepository_1 = require("./repository/GetRegisterItemRepository");
const GetRegisterItemService_1 = require("./service/GetRegisterItemService");
const AWS = __importStar(require("aws-sdk"));
class Factory {
    constructor() {
        this.getItemRepository = new GetItemRepository_1.GetItemRepository(new AWS.DynamoDB.DocumentClient());
        this.getItemService = new GetItemService_1.GetItemService(this.getItemRepository);
        this.getRegisterItemRepository = new GetRegisterItemRepository_1.GetRegisterItemRepository(new AWS.DynamoDB.DocumentClient());
        this.getRegisterItemService = new GetRegisterItemService_1.GetRegisterItemService(this.getRegisterItemRepository);
    }
    getItemServiceInstance() {
        return this.getItemService;
    }
    getItemRepositoryInstance() {
        return this.getItemRepository;
    }
    getRegisterItemServiceInstance() {
        return this.getRegisterItemService;
    }
    getRegisterItemRepositoryInstance() {
        return this.getRegisterItemRepository;
    }
}
exports.Factory = Factory;
