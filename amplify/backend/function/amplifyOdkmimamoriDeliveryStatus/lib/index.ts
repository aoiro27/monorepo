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
 * @returns 配信メールアドレス
 */
export async function index(
    event: APIGatewayProxyEvent, 
    context: APIGatewayEventRequestContext,
    dummy?:any, 
    getServiceItem?: GetItemService
): Promise<APIGatewayProxyResult> {
    console.log('event: ' + event)
    let deliveredEmail: string;
    let deliveredTimeFrom: string;
    let deliveredTimeTo: string;
    const getItemService = injectDependency(getServiceItem);

    try {
        deliveredEmail = getDeliveredEmail(event);
        deliveredTimeFrom = getDeliveredTimeFrom(event);
        deliveredTimeTo = getDeliveredTimeTo(event);
        // biblleId = getBiblleId(event);
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
        // let data: string = await getItemService.getItem(biblleId);
        let data: string = await getItemService.getItem(deliveredEmail, deliveredTimeFrom, deliveredTimeTo);
        console.log('data: ' + data)
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
        }
    } catch (e) {
        return {
            "statusCode": 503,
            // "headers": {},
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
    const deliveredEmail = event?.pathParameters?.deliveredEmail;
    if (deliveredEmail == undefined) {
        throw new Error("deliveredEmail is undefined");
    }
    return deliveredEmail;
}

function getDeliveredTimeFrom(event: APIGatewayProxyEvent): string {
    const deliveredTimeFrom = event?.pathParameters?.deliveredTimeFrom;
    // 検索条件：期間を指定しなかった場合の考慮
    if (deliveredTimeFrom == undefined) {
        throw new Error("deliveredTimeFrom is undefined");
    }
    return deliveredTimeFrom;
}

function getDeliveredTimeTo(event: APIGatewayProxyEvent): string {
    const deliveredTimeTo = event?.pathParameters?.deliveredTimeTo;
    // 検索条件：期間を指定しなかった場合の考慮
    if (deliveredTimeTo == undefined) {
        throw new Error("deliveredTimeTo is undefined");
    }
    return deliveredTimeTo;
}

