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
const Factory_1 = require("./Factory");
/**
 * biblleアカウント (biblleMailAddress) をキーに登録状況を取得
 * @param event
 * @param context
 * @returns ユーザー情報（ONE会員ステータス、ONE UID）
 */
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = (event, context, dummy, getServiceItem, getServiceRegisterItem) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(event);
    let biblleMailAddress;
    const getItemService = injectDependency(getServiceItem);
    const getRegisterItemService = injectDependency2(getServiceRegisterItem);
    try {
        biblleMailAddress = getBiblleMailAddress(event);
        console.log('biblleMailAddress: ' + biblleMailAddress);
    }
    catch (e) {
        console.error(event);
        return {
            "statusCode": 400,
            // "headers": {},
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": "OPTIONS,GET"
            },
            "body": JSON.stringify({ "msg": "Request Parameter is Invalid" }),
            "isBase64Encoded": false
        };
    }
    try {
        // 配信登録情報および認証ステータス取得
        // RegisterItem[]
        // export type RegisterItem = {
        //     tagName: string;
        //     deliveryMail: string;
        //     isAuthenticated: boolean;
        // }
        // 配列か、配列形式の文字列
        let registerItems = yield getRegisterItemService.getRegisterItem(biblleMailAddress);
        console.log(registerItems);
        // ユーザー情報取得
        // let data: string = await getItemService.getItem(biblleMailAddress);
        let data = yield getItemService.getItem(biblleMailAddress, registerItems);
        console.log('data: ' + data);
        return {
            "statusCode": 200,
            // "headers": {},
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": "OPTIONS,GET"
            },
            "body": data,
            "isBase64Encoded": false
        };
    }
    catch (e) {
        return {
            "statusCode": 503,
            // "headers": {},
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": "OPTIONS,GET"
            },
            "body": JSON.stringify({ "msg": "Delivered Info get operation is failed" }),
            "isBase64Encoded": false
        };
    }
});
function injectDependency(getItemService) {
    return getItemService !== null && getItemService !== void 0 ? getItemService : new Factory_1.Factory().getItemServiceInstance();
}
function injectDependency2(getRegisterItemService) {
    return getRegisterItemService !== null && getRegisterItemService !== void 0 ? getRegisterItemService : new Factory_1.Factory().getRegisterItemServiceInstance();
}
function getBiblleMailAddress(event) {
    var _a;
    const biblleMailAddress = (_a = event === null || event === void 0 ? void 0 : event.pathParameters) === null || _a === void 0 ? void 0 : _a.biblleMailAddress;
    if (biblleMailAddress == undefined) {
        throw new Error("biblleMailAddress is undefined");
    }
    return biblleMailAddress;
}
