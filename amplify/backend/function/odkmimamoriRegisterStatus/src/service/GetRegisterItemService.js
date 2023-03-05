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
exports.GetRegisterItemService = void 0;
const AWS = __importStar(require("aws-sdk"));
const serviceConfigOptions = {
    region: "ap-northeast-1",
};
class GetRegisterItemService {
    constructor(getRegisterItemRepository) {
        this.getRegisterItemRepository = getRegisterItemRepository;
    }
    getRegisterItem(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // biblleアカウントをキーに、配信登録情報を取得
                const registerItems = yield this.getRegisterItemRepository.requestDynamoDB(key);
                // 配信メールアドレスごとの配列定義
                const registerItemsArray = [];
                // 取得した配信情報レコード分ループ
                console.log('*** 取得した配信情報レコード分ループ取得: 開始 ***');
                for (const key in registerItems) {
                    let tagName = registerItems[key].biblleTagName;
                    for (const deliveryMails of registerItems[key].deliveredEmails.deliveredEmails) {
                        let deliveryMail = deliveryMails.deliveredEmail;
                        let isAuthenticated = false; // SES認証ステータス初期化(デフォルトfalse)
                        const sesResponse = yield new AWS.SES().getIdentityVerificationAttributes({
                            Identities: [`${deliveryMail}`]
                        }).promise();
                        if (Object.keys(sesResponse.VerificationAttributes).length > 0) {
                            if (sesResponse.VerificationAttributes[deliveryMail].VerificationStatus === "Success") {
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
                        registerItemsArray.push(registerItem); // 配列にJSON形式で追加
                    }
                }
                console.log('*** 取得した配信情報レコード分ループ取得: 終了 ***');
                console.log(registerItemsArray);
                // return JSON.stringify(registerItemsArray);
                return registerItemsArray;
            }
            catch (e) {
                console.error(e);
                throw new Error("Register status getItem is failed");
            }
        });
    }
}
exports.GetRegisterItemService = GetRegisterItemService;
;
