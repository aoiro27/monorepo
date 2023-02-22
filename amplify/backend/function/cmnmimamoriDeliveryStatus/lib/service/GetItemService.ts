import { GetItemRepository } from "../repository/GetItemRepository";

export type bodyType = {
  deliveredEmail: string;
  deliveredTimeFrom: string;
  deliveredTimeTo: string;
};

export class GetItemService {

  private getItemRepository: GetItemRepository;

  constructor(getItemRepository: GetItemRepository) {
    this.getItemRepository = getItemRepository;
  }

  public async getItem(search_key: string, search_from: string, search_to: string): Promise<string> {
    const deliveryItems = await this.getItemRepository.requestDynamoDB(search_key, search_from, search_to);
    console.log(deliveryItems);

    // 配信履歴の配列定義
    const deliveryItemsArray: any[] = [];
    // 取得した配信履歴情報をループ
    for(const key in deliveryItems){
      var deliveryStatusResult = {
        mail: deliveryItems[key].deliveredEmail,
        timestamp: deliveryItems[key].deliveredTime,
        station: deliveryItems[key].stationName,
        tag: deliveryItems[key].biblleTagName
      };
      console.log(deliveryStatusResult);
      deliveryItemsArray.push(deliveryStatusResult);  // 配列にJSON形式で追加
    }
    console.log(deliveryItemsArray);
    // return data;
    return JSON.stringify(deliveryItemsArray);

  }
};
