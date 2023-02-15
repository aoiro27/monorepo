import { GetRegisterItemRepository } from "../repository/GetRegisterItemRepository";
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

export class GetRegisterItemService {
    
  private getRegisterItemRepository: GetRegisterItemRepository;

  constructor(getRegisterItemRepository: GetRegisterItemRepository) {
    this.getRegisterItemRepository = getRegisterItemRepository;
  }

  public async getRegisterItem(key: string): Promise<any[]> {
    try {
      // biblleアカウントをキーに、配信登録情報を取得
      const registerItems = await this.getRegisterItemRepository.requestDynamoDB(key);

      // 配信メールアドレスごとの配列定義
      const registerItemsArray: any[] = [];

      // 取得した配信情報レコード分ループ
      console.log('*** 取得した配信情報レコード分ループ取得: 開始 ***');
      for(const key in registerItems){
        let tagName = registerItems[key].biblleTagName
        for(const deliveryMails of registerItems[key].deliveredEmails.deliveredEmails){
          let deliveryMail = deliveryMails.deliveredEmail;
          let isAuthenticated = false;  // SES認証ステータス初期化(デフォルトfalse)
          const sesResponse = await new AWS.SES().getIdentityVerificationAttributes(
            { 
              Identities: [`${deliveryMail}`]
            }
          ).promise();
          if(Object.keys(sesResponse.VerificationAttributes).length > 0){
            if(sesResponse.VerificationAttributes[deliveryMail].VerificationStatus === "Success"){
              console.log(deliveryMail + '_isAuthenticated : Success');
              isAuthenticated = true;
            }
          }
          var registerItem = {
            tagName: tagName,
            deliveryMail: deliveryMail,
            isAuthenticated: isAuthenticated
          };
          console.log(registerItem);          
          registerItemsArray.push(registerItem);  // 配列にJSON形式で追加
        }
      }
      console.log('*** 取得した配信情報レコード分ループ取得: 終了 ***');
      console.log(registerItemsArray);

      // return JSON.stringify(registerItemsArray);
      return registerItemsArray;

    } catch (e) {
      console.error(e);
      throw new Error("Register status getItem is failed");
    }
  }
};
