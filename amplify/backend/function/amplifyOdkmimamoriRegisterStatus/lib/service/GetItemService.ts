import { GetItemRepository } from "../repository/GetItemRepository";
// import { GetRegisterItemRepository } from "../repository/GetRegisterItemRepository";
import * as AWS from "aws-sdk";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";

const serviceConfigOptions: ServiceConfigurationOptions = {
  region: "ap-northeast-1",
};

export type bodyType = {
  biblleMailAddress?: string;
  onePaidStatus?: boolean;
  oneUid?: string;
};

export class GetItemService {
    
  private getItemRepository: GetItemRepository;
  // private getRegisterItemRepository: GetRegisterItemRepository;

  constructor(getItemRepository: GetItemRepository) {
    this.getItemRepository = getItemRepository;
  }

  // public async getItem(key: string): Promise<string> {
  public async getItem(key: string, RegisterItems: any[]): Promise<string> {
    try {
      // biblleアカウントをキーに、ユーザー情報を取得
      const data = await this.getItemRepository.requestDynamoDB(key);
      // パラメータで渡された配信登録情報をJSONに追加
      var RegisterStatusResult = {
        registerdMail: data.biblleMailAddress,
        oneUid: data.oneUid,
        isPaidUser: data.onePaidStatus,
        registerItems: RegisterItems
      };
      console.log(RegisterStatusResult);
      // return JSON.stringify(data);
      return JSON.stringify(RegisterStatusResult);

    } catch (e) {
      console.error(e);
      throw new Error("Register status getItem is failed");
    }
  }
};
