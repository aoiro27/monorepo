"use strict";
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
exports.GetItemService = void 0;
const serviceConfigOptions = {
    region: "ap-northeast-1",
};
class GetItemService {
    // private getRegisterItemRepository: GetRegisterItemRepository;
    constructor(getItemRepository) {
        this.getItemRepository = getItemRepository;
    }
    // public async getItem(key: string): Promise<string> {
    getItem(key, RegisterItems) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // biblleアカウントをキーに、ユーザー情報を取得
                const data = yield this.getItemRepository.requestDynamoDB(key);
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
            }
            catch (e) {
                console.error(e);
                throw new Error("Register status getItem is failed");
            }
        });
    }
}
exports.GetItemService = GetItemService;
;
