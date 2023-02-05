import { GetItemRepository } from "../repository/GetItemRepository";

export type bodyType = {
  deliveredEmail?: string;
  deliveredTime?: string;
  alsokDeviceId?: string;
  stationId?: string;
  stationName?: string;
  biblleId?: string;
  biblleTagName?: string;
};

export class GetItemService {
    
  private getItemRepository: GetItemRepository;

  constructor(getItemRepository: GetItemRepository) {
    this.getItemRepository = getItemRepository;
  }

  public async getItem(search_key: string, search_from: string, search_to: string): Promise<string> {
    const data = await this.getItemRepository.requestDynamoDB(search_key, search_from, search_to);
    return JSON.stringify(data);
  }
};
