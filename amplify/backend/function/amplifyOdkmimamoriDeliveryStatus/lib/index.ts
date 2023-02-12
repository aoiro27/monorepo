import {
    APIGatewayEventRequestContext,
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from 'aws-lambda';
import { Factory } from './Factory';
import { GetItemService } from './service/GetItemService';

/**
 * 配信メールアドレスと配信日時を条件に配信履歴を抽出
 * @param event 
 * @param context 
 * @returns 
 */
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (
    event: APIGatewayProxyEvent, 
    context: APIGatewayEventRequestContext,
    dummy?:any, 
    getServiceItem?: GetItemService
): Promise<APIGatewayProxyResult> => {
    console.log(event);
    console.log(event.queryStringParameters);
    let deliveredEmail: string;
    let deliveredTimeFrom: string;  // YYYYMMDD
    let deliveredTimeTo: string;    // YYYYMMDD
    const getItemService = injectDependency(getServiceItem);

    try {
        deliveredEmail = getDeliveredEmail(event);
        deliveredTimeFrom = getDeliveredTimeFrom(event);
        deliveredTimeTo = getDeliveredTimeTo(event);

        // ValidationException回避対応（FROM-TOが逆転している場合は同じ日時にする）
        if (deliveredTimeFrom && deliveredTimeTo && deliveredTimeFrom > deliveredTimeTo) {
            deliveredTimeFrom = deliveredTimeTo
        }

    } catch (e) {
        console.error(event)
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
        }
    }

    try {
        let data: string = await getItemService.getItem(deliveredEmail, deliveredTimeFrom, deliveredTimeTo);
        console.log('data: ' + data)
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": "OPTIONS,GET"
            },
            "body": data,
            "isBase64Encoded": false
        }
    } catch (e) {
        return {
            "statusCode": 503,
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": "OPTIONS,GET"
            },
            "body": JSON.stringify({ "msg": "Delivered history get operation is failed" }),
            "isBase64Encoded": false
        }
    }
}

function injectDependency(getItemService?: GetItemService): GetItemService {
    return getItemService ?? new Factory().getItemServiceInstance();
}

function getDeliveredEmail(event: APIGatewayProxyEvent): string {
    const email = event?.queryStringParameters?.email;
    if (email == undefined || email == null) {
        throw new Error("deliveredEmail is undefined/null");
    }
    return email;
}

function getDeliveredTimeFrom(event: APIGatewayProxyEvent): string {
    let from = event?.queryStringParameters?.from;
    if (from == undefined) {
        throw new Error("deliveredTimeFrom is undefined");
    }
    // 抽出期間パラメータはYYYYMMDD の前提。時分秒を付与
    if (from) {
        if (!isYYYYMMDD(from)) {
            throw new Error("deliveredTimeFrom is not date format");
        }
        var from_str = from.slice(0,4) + "/";
        from_str += from.slice(4,6) + "/";
        from_str += from.slice(-2);
        from = from_str + ' 00:00:00';
    } else { 
        // 検索条件：期間を指定しなかった場合の考慮
        from = '1900/01/01 00:00:00';
    }
    return from;
}

function getDeliveredTimeTo(event: APIGatewayProxyEvent): string {
    let to = event?.queryStringParameters?.to;
    if (to == undefined) {
        throw new Error("deliveredTimeTo is undefined");
    }
    // 抽出期間パラメータはYYYYMMDD の前提。時分秒を付与
    if (to) {
        if (!isYYYYMMDD(to)) {
            throw new Error("deliveredTimeTo is not date format");
        }
        var to_str = to.slice(0,4) + "/";
        to_str += to.slice(4,6) + "/";
        to_str += to.slice(-2);
        to = to_str + ' 23:59:59';
    } else { 
        // 検索条件：期間を指定しなかった場合の考慮
        to = '2999/12/31 23:59:59';
    }
    return to;
}

// 日付パラメータチェック
function isYYYYMMDD(str: string){
    let str_i = parseInt(str);
    console.log('parseInt(' + str + '): ' + str_i); // 文字列のみの場合は'NaN'を返す
    console.log('Number.isNaN(' + str_i + '): ' + Number.isNaN(str_i)); // 'NaN'(文字列)の場合true
    // 8文字でない or 数値でない場合はfalse
    if(str.length != 8 || String(str_i).length != 8 || Number.isNaN(str_i)){
        console.log('パラメータの文字数不正もしくは数値以外指定: ' + str)
        return false;
    }
   
    // 年,月,日を取得する
    var y = parseInt(str.slice(0,4));
    var m = parseInt(str.slice(4,6)) -1;  //月は0～11で指定するため-1している
    var d = parseInt(str.slice(-2));
    var dt = new Date(y, m, d);
    console.log('y: ' + y + ', m-1: ' + m + ',d: ' + d + ', dt: ' + dt.getFullYear() + '/' + dt.getMonth() + '/' + dt.getDate());
    // 判定する
    return (y == dt.getFullYear() && m == dt.getMonth() && d == dt.getDate());
  }