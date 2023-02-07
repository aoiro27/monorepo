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
class GetItemService {
    constructor(getItemRepository) {
        this.getItemRepository = getItemRepository;
    }
    getItem(search_key, search_from, search_to) {
        return __awaiter(this, void 0, void 0, function* () {
            const deliveryItems = yield this.getItemRepository.requestDynamoDB(search_key, search_from, search_to);
            console.log(deliveryItems);
            // 配信履歴の配列定義
            const deliveryItemsArray = [];
            // 取得した配信履歴情報をループ
            for (const key in deliveryItems) {
                var deliveryStatusResult = {
                    mail: deliveryItems[key].deliveredEmail,
                    timestamp: deliveryItems[key].deliveredTime,
                    station: deliveryItems[key].stationName,
                    tag: deliveryItems[key].biblleTagName
                };
                console.log(deliveryStatusResult);
                deliveryItemsArray.push(deliveryStatusResult); // 配列にJSON形式で追加
            }
            console.log(deliveryItemsArray);
            // return data;
            return JSON.stringify(deliveryItemsArray);
        });
    }
}
exports.GetItemService = GetItemService;
;
