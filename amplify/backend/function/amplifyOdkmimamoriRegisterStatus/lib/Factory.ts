import { GetItemRepository } from './repository/GetItemRepository';
import { GetItemService } from './service/GetItemService';
import { GetRegisterItemRepository } from './repository/GetRegisterItemRepository';
import { GetRegisterItemService } from './service/GetRegisterItemService';
import * as AWS from 'aws-sdk';

export class Factory{
    private getItemService: GetItemService;
    private getItemRepository: GetItemRepository;
    private getRegisterItemService: GetRegisterItemService;
    private getRegisterItemRepository: GetRegisterItemRepository;

    public constructor(){
        this.getItemRepository = new GetItemRepository(
            new AWS.DynamoDB.DocumentClient()
        );
        this.getItemService = new GetItemService(this.getItemRepository);
        this.getRegisterItemRepository = new GetRegisterItemRepository(
            new AWS.DynamoDB.DocumentClient()
        );
        this.getRegisterItemService = new GetRegisterItemService(this.getRegisterItemRepository);
    }

    public getItemServiceInstance() : GetItemService{
        return this.getItemService;
    }

    public getItemRepositoryInstance() : GetItemRepository{
        return this.getItemRepository;
    }

    public getRegisterItemServiceInstance() : GetRegisterItemService{
        return this.getRegisterItemService;
    }

    public getRegisterItemRepositoryInstance() : GetRegisterItemRepository{
        return this.getRegisterItemRepository;
    }
}
