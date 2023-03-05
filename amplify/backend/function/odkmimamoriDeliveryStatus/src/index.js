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
 * 配信メールアドレスと配信日時を条件に配信履歴を抽出
 * @param event
 * @param context
 * @returns
 */
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = (event, context, dummy, getServiceItem) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(event);
    console.log(event.queryStringParameters);
    let deliveredEmail;
    let deliveredTimeFrom; // YYYYMMDD
    let deliveredTimeTo; // YYYYMMDD
    const getItemService = injectDependency(getServiceItem);
    try {
        deliveredEmail = getDeliveredEmail(event);
        deliveredTimeFrom = getDeliveredTimeFrom(event);
        deliveredTimeTo = getDeliveredTimeTo(event);
        // ValidationException回避対応（FROM-TOが逆転している場合は同じ日時にする）
        if (deliveredTimeFrom && deliveredTimeTo && deliveredTimeFrom > deliveredTimeTo) {
            deliveredTimeFrom = deliveredTimeTo;
        }
    }
    catch (e) {
        console.error(event);
        return {
            "statusCode": 400,
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
        let data = yield getItemService.getItem(deliveredEmail, deliveredTimeFrom, deliveredTimeTo);
        console.log('data: ' + data);
        return {
            "statusCode": 200,
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
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": "OPTIONS,GET"
            },
            "body": JSON.stringify({ "msg": "Delivered history get operation is failed" }),
            "isBase64Encoded": false
        };
    }
});
function injectDependency(getItemService) {
    return getItemService !== null && getItemService !== void 0 ? getItemService : new Factory_1.Factory().getItemServiceInstance();
}
function getDeliveredEmail(event) {
    var _a;
    const email = (_a = event === null || event === void 0 ? void 0 : event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.email;
    if (email == undefined || email == null) {
        throw new Error("deliveredEmail is undefined/null");
    }
    return email;
}
function getDeliveredTimeFrom(event) {
    var _a;
    let from = (_a = event === null || event === void 0 ? void 0 : event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.from;
    if (from == undefined) {
        throw new Error("deliveredTimeFrom is undefined");
    }
    // 抽出期間パラメータはYYYYMMDD の前提。時分秒を付与
    if (from) {
        if (!isYYYYMMDD(from)) {
            throw new Error("deliveredTimeFrom is not date format");
        }
        var from_str = from.slice(0, 4) + "/";
        from_str += from.slice(4, 6) + "/";
        from_str += from.slice(-2);
        from = from_str + ' 00:00:00';
    }
    else {
        // 検索条件：期間を指定しなかった場合の考慮
        from = '1900/01/01 00:00:00';
    }
    return from;
}
function getDeliveredTimeTo(event) {
    var _a;
    let to = (_a = event === null || event === void 0 ? void 0 : event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.to;
    if (to == undefined) {
        throw new Error("deliveredTimeTo is undefined");
    }
    // 抽出期間パラメータはYYYYMMDD の前提。時分秒を付与
    if (to) {
        if (!isYYYYMMDD(to)) {
            throw new Error("deliveredTimeTo is not date format");
        }
        var to_str = to.slice(0, 4) + "/";
        to_str += to.slice(4, 6) + "/";
        to_str += to.slice(-2);
        to = to_str + ' 23:59:59';
    }
    else {
        // 検索条件：期間を指定しなかった場合の考慮
        to = '2999/12/31 23:59:59';
    }
    return to;
}
// 日付パラメータチェック
function isYYYYMMDD(str) {
    let str_i = parseInt(str);
    console.log('parseInt(' + str + '): ' + str_i); // 文字列のみの場合は'NaN'を返す
    console.log('Number.isNaN(' + str_i + '): ' + Number.isNaN(str_i)); // 'NaN'(文字列)の場合true
    // 8文字でない or 数値でない場合はfalse
    if (str.length != 8 || String(str_i).length != 8 || Number.isNaN(str_i)) {
        console.log('パラメータの文字数不正もしくは数値以外指定: ' + str);
        return false;
    }
    // 年,月,日を取得する
    var y = parseInt(str.slice(0, 4));
    var m = parseInt(str.slice(4, 6)) - 1; //月は0～11で指定するため-1している
    var d = parseInt(str.slice(-2));
    var dt = new Date(y, m, d);
    console.log('y: ' + y + ', m-1: ' + m + ',d: ' + d + ', dt: ' + dt.getFullYear() + '/' + dt.getMonth() + '/' + dt.getDate());
    // 判定する
    return (y == dt.getFullYear() && m == dt.getMonth() && d == dt.getDate());
}