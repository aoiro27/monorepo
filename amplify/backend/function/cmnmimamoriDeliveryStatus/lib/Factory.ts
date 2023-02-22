import { GetItemRepository } from './repository/GetItemRepository';
import { GetItemService } from './service/GetItemService';
import * as AWS from 'aws-sdk';

export class Factory{
    private getItemService: GetItemService;
    private getItemRepository: GetItemRepository;

    public constructor(){
        this.getItemRepository = new GetItemRepository(
            new AWS.DynamoDB.DocumentClient()
        );
        this.getItemService = new GetItemService(this.getItemRepository);
    }

    public getItemServiceInstance() : GetItemService{
        return this.getItemService;
    }

    public getItemRepositoryInstance() : GetItemRepository{
        return this.getItemRepository;
    }

}
